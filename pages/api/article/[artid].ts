import { prisma } from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { redirect } from 'next/dist/server/api-utils'

export default async function handler(req: NextApiRequest, res:NextApiResponse){
  const artID = req.query.artid
  const {title, body, user} = req.body

  if(req.method === "DELETE"){
    const article = await prisma.article.delete({
        where: {artid: Number(artID)}
    })
    res.json(article)
  } else {
    console.log("aticle could not be deleted")
  }

  if(req.method === "GET"){
    const article = await prisma.article.findUnique({
      where: {artid: Number(artID)}
    })
    res.json(article)
  } else {
    console.log("aticle could not be fetched")
  }

  if(req.method === "PUT"){
    const article = await prisma.article.update({
      where: {
        artid: Number(artID)
      },
      data: {
        body: body,
      },
    })
    res.json(article)
  } else {
    console.log("aticle could not be updated")
  }
}