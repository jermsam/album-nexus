import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async(req, res)=> {
  if (req.method === 'POST') {
    const { body } = req;
    const artist = await prisma.artist.create({ data: JSON.parse(body) });
    res.json(artist);
  }
}
