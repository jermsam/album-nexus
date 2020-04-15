
import {  makeSchema } from '@nexus/schema'
import { nexusPrismaPlugin } from 'nexus-prisma'



import path from 'path'
import Song from './Song'
import Artist from './Artist'
import Mutation from './Mutation'
import Query from './Query'



export default makeSchema({
    types: [Artist,Song,Mutation,Query],
    plugins: [nexusPrismaPlugin()],
    outputs: {
        typegen: path.join(__dirname, '../generated/nexus-typegen.ts'),
        schema: path.join(__dirname, '../generated/schema.graphql')
      },
  })