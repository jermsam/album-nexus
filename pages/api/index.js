import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findSongs =()=>prisma.song.findMany({
    include: { artist: true }
  });

export const getSong = id =>prisma.song.findOne({
    include: { artist: true },
    where: {
      id
    }
  });  


