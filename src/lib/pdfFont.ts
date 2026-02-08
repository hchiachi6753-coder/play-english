// PDF 中文字體載入器
export async function loadChineseFont(): Promise<string> {
  try {
    const response = await fetch('/fonts/NotoSansTC-Regular.ttf');
    const arrayBuffer = await response.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return base64;
  } catch (error) {
    console.error('Failed to load font:', error);
    return '';
  }
}
