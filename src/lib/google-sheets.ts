// Google Sheets API 串接
// 用於儲存家長資料（Lead）

interface LeadData {
  childName: string;
  childAge: number;
  parentName: string;
  phone: string;
  timestamp: string;
  // 遊戲結果
  accuracy?: number;
  level?: string;
  totalTime?: number;
}

// 使用 Google Sheets API 透過 Apps Script Web App
// 這是一個簡單的方式，不需要複雜的 OAuth 設定
export async function submitLeadToGoogleSheets(data: LeadData): Promise<boolean> {
  // TODO: 設定 Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('⚠️ Google Script URL not configured');
    return false;
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script 需要這個
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('✅ Lead submitted to Google Sheets');
    return true;
  } catch (error) {
    console.error('❌ Failed to submit lead:', error);
    return false;
  }
}

// Google Apps Script 範例程式碼（部署為 Web App）
/*
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.childName,
      data.childAge,
      data.parentName,
      data.phone,
      data.accuracy || '',
      data.level || '',
      data.totalTime || '',
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Play English Lead API is running!');
}
*/
