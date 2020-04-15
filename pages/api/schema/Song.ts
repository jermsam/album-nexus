
import { objectType,  asNexusMethod } from 'nexus'

import { PrismaClient } from '@prisma/client'




const prisma = new PrismaClient()

export default objectType({
    name: 'Song',
    definition(t) {
       t.model.id()
       t.model.name()
       t.model.youtubeId()
       t.model.artistId()
       t.model.albumCoverUrl()
       t.model.Artist()
    },
  })
  
