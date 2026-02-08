import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface LeadData {
  childName: string;
  childAge: number;
  parentName: string;
  phone: string;
  timestamp: string;
  referralCode?: string;
  referredBy?: string;
  level?: string;
  accuracy?: number;
  booking?: {
    date: string;
    timeSlot: string;
    parentName: string;
    childName: string;
    bookedAt: string;
  };
}

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

// 發送到 Google Sheets
async function sendToGoogleSheets(data: LeadData) {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('⚠️ Google Script URL not configured');
    return false;
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        childName: data.childName,
        childAge: data.childAge,
        parentName: data.parentName,
        phone: data.phone,
        referralCode: data.referralCode || '',
        referredBy: data.referredBy || '',
        bookingDate: data.booking?.date || '',
        bookingTimeSlot: data.booking?.timeSlot || '',
        level: data.level || '',
        accuracy: data.accuracy || '',
      }),
    });
    console.log('✅ Lead sent to Google Sheets');
    return true;
  } catch (error) {
    console.error('❌ Failed to send to Google Sheets:', error);
    return false;
  }
}

async function saveLeadToFile(lead: LeadData) {
  try {
    const dataDir = path.dirname(LEADS_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    
    let leads: LeadData[] = [];
    try {
      const existing = await fs.readFile(LEADS_FILE, 'utf-8');
      leads = JSON.parse(existing);
    } catch {
      // 檔案不存在
    }
    
    leads.push(lead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    
    return true;
  } catch (error) {
    console.error('Error saving lead to file:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    if (!data.childName || !data.childAge || !data.parentName || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!/^09\d{8}$/.test(data.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    console.log('📝 New lead received:', {
      childName: data.childName,
      childAge: data.childAge,
      parentName: data.parentName,
      phone: data.phone,
      timestamp: data.timestamp,
    });

    // 存到本地 JSON（備份）
    await saveLeadToFile(data);
    
    // 發送到 Google Sheets
    await sendToGoogleSheets(data);

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(data);
    return NextResponse.json({ leads, count: leads.length });
  } catch {
    return NextResponse.json({ leads: [], count: 0 });
  }
}

// PUT - 更新預約資訊
export async function PUT(request: NextRequest) {
  try {
    const { phone, booking, level, accuracy } = await request.json();

    if (!phone || !booking) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 讀取現有資料
    let leads: LeadData[] = [];
    try {
      const existing = await fs.readFile(LEADS_FILE, 'utf-8');
      leads = JSON.parse(existing);
    } catch {
      // 檔案不存在
    }

    // 找到對應的 lead 並更新
    const leadIndex = leads.findIndex(l => l.phone === phone);
    let updatedLead: LeadData;
    
    if (leadIndex >= 0) {
      leads[leadIndex] = {
        ...leads[leadIndex],
        booking,
        level: level || leads[leadIndex].level,
        accuracy: accuracy || leads[leadIndex].accuracy,
      };
      updatedLead = leads[leadIndex];
    } else {
      updatedLead = {
        childName: booking.childName,
        childAge: 0,
        parentName: booking.parentName,
        phone,
        timestamp: new Date().toISOString(),
        booking,
        level,
        accuracy,
      };
      leads.push(updatedLead);
    }

    // 寫回檔案
    const dataDir = path.dirname(LEADS_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');

    // 同時更新到 Google Sheets（發送完整記錄）
    await sendToGoogleSheets(updatedLead);

    console.log('📅 Booking updated:', { phone, booking });

    return NextResponse.json({ success: true, message: 'Booking updated' });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
