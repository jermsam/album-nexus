import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findSongs =()=>prisma.song.findMany({
  
  });

export const getSong = id =>prisma.song.findOne({

    where: {
      id
    }
  });  


