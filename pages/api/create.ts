import { prisma } from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { redirect } from 'next/dist/server/api-utils'

export default async function handler(req: NextApiRequest, res:NextApiResponse){
  const {title, body, user} = req.body

  console.log(body)

  try {
    await prisma.article.create({
      data: {
        title,
        body,
        // user,
      }
    })
    res.status(200).json({message: "article published"})
  } catch(error) {
    console.log(error)
  }
}