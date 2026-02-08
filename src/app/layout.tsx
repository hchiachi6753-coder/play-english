import type { Metadata, Viewport } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import './globals.css';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Play English 🎮 英文單字遊戲',
  description: '透過遊戲學習英文單字，適合 4-12 歲兒童！',
  keywords: ['英文', '單字', '遊戲', '兒童', '學習', 'OiKID'],
  authors: [{ name: 'OiKID' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FF9F43',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className={notoSansTC.className}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
