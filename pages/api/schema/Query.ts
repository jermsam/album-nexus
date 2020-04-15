
import { objectType,} from 'nexus'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

export default objectType({
    name: 'Query',
    definition(t) {
   t.crud.artist()
   t.crud.artists()
   
   t.crud.song()
   t.crud.songs()
    },
  })
