import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = new formidable.IncomingForm({ uploadDir, keepExtensions: true, maxFileSize: MAX_SIZE });
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload error: " + err.message });
    const file = files.file;
    if (!file) return res.status(400).json({ error: "No file" });
    const uploaded = Array.isArray(file) ? file[0] : file;
    // 파일 타입 체크
    if (!ALLOWED_TYPES.includes(uploaded.mimetype || "")) {
      fs.unlinkSync(uploaded.filepath);
      return res.status(400).json({ error: "이미지 파일만 업로드 가능합니다." });
    }
    // 파일명 XSS 방지
    const safeName = (uploaded.originalFilename || "").replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${Date.now()}_${safeName}`;
    const filePath = path.join(uploadDir, fileName);
    try {
      fs.renameSync(uploaded.filepath, filePath);
    } catch (e) {
      return res.status(500).json({ error: "파일 저장 실패" });
    }
    return res.status(200).json({ url: `/uploads/${fileName}` });
  });
} 