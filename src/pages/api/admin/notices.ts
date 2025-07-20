import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const notices = await prisma.notice.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(notices);
  }
  if (req.method === "POST") {
    const { title, content } = req.body;
    const notice = await prisma.notice.create({ data: { title, content } });
    return res.status(201).json(notice);
  }
  if (req.method === "PUT") {
    const { id, title, content } = req.body;
    const notice = await prisma.notice.update({ where: { id }, data: { title, content } });
    return res.status(200).json(notice);
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.notice.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 