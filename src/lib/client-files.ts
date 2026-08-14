/** Client helpers for reading uploads into AI-ready payloads. */

export async function fileToStudyPayload(file: File): Promise<{
  text?: string;
  imageDataUrl?: string;
  fileName: string;
}> {
  const fileName = file.name || "upload";
  const type = file.type || "";

  if (type.startsWith("text/") || /\.(txt|md|csv)$/i.test(fileName)) {
    const text = await file.text();
    return { text: text.slice(0, 14000), fileName };
  }

  if (type.startsWith("image/") || /\.(png|jpe?g|webp|gif)$/i.test(fileName)) {
    const imageDataUrl = await readAsDataUrl(file);
    return { imageDataUrl, fileName };
  }

  if (type === "application/pdf" || /\.pdf$/i.test(fileName)) {
    // Vision-capable models can read PDF data URLs via AI Gateway / Gemini.
    const imageDataUrl = await readAsDataUrl(file);
    return { imageDataUrl, fileName, text: `PDF file: ${fileName}` };
  }

  // docx / unknown: try text decode as best-effort
  try {
    const text = await file.text();
    if (text && /[\u0E00-\u0E7Fa-zA-Z0-9]/.test(text)) {
      return { text: text.slice(0, 14000), fileName };
    }
  } catch {
    /* ignore */
  }

  throw new Error("รองรับไฟล์ .txt .md .pdf รูปภาพ หรือวางข้อความ");
}

export function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 4 * 1024 * 1024) {
      reject(new Error("ไฟล์ใหญ่เกิน 4MB"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("อ่านไฟล์ไม่สำเร็จ"));
    reader.readAsDataURL(file);
  });
}
