import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Content 모델에서 page: 'service'인 데이터 조회
    const services = await prisma.content.findMany({ where: { page: "service" }, orderBy: { order: "asc" } });
    return res.status(200).json(services);
  }
  if (req.method === "POST") {
    const { section, title, order } = req.body;
    const service = await prisma.content.create({ data: { page: "service", section, title, content: "", order } });
    return res.status(201).json(service);
  }
  if (req.method === "PUT") {
    const { id, title, order } = req.body;
    const service = await prisma.content.update({ where: { id }, data: { title, order } });
    return res.status(200).json(service);
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.content.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 