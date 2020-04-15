
import {graphql} from 'graphql'
import schema from './schema'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()




export default async (req: { body: { query: any; variables: any } }, res: { end: (arg0: string) => any }) => {
    const {query,variables} = req.body

    const response = await graphql(schema, query, {}, {prisma}, variables)
    return res.end(JSON.stringify(response))
  }