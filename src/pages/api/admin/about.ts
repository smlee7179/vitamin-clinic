import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // 소개 데이터 조회 (page: 'about')
    const about = await prisma.content.findMany({
      where: { page: "about" },
      orderBy: { order: "asc" },
    });
    return res.status(200).json(about);
  }
  if (req.method === "POST") {
    // 소개 데이터 저장/수정
    const { section, title, content, image, order, fontSize } = req.body;
    const upsert = await prisma.content.upsert({
      where: { page_section: { page: "about", section } },
      update: { title, content, image, order, fontSize },
      create: { page: "about", section, title, content, image, order, fontSize },
    });
    return res.status(200).json(upsert);
  }
  if (req.method === "DELETE") {
    // 소개 데이터 삭제
    const { id } = req.body;
    await prisma.content.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 