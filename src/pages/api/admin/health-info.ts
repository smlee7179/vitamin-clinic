import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const infos = await prisma.healthInfo.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(infos);
  }
  if (req.method === "POST") {
    const { title, content, category, imageUrl } = req.body;
    const info = await prisma.healthInfo.create({ data: { title, content, category, imageUrl } });
    return res.status(201).json(info);
  }
  if (req.method === "PUT") {
    const { id, title, content, category, imageUrl } = req.body;
    const info = await prisma.healthInfo.update({ where: { id }, data: { title, content, category, imageUrl } });
    return res.status(200).json(info);
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.healthInfo.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 