import { objectType } from 'nexus'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export default objectType({
    name: 'Artist',
    definition(t) {
    t.model.id()
    t.model.name()
    t.model.Song()
    },
  })

