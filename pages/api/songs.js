import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async(req, res)=> {
  if (req.method === 'POST') {
    const { body } = req;
    const song = await prisma.song.create({ data: JSON.parse(body) });
    res.json(song);
  }
}
