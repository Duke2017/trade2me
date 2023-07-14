import { PrismaClient } from "@prisma/client"
import { advertInputType } from "../types"

const prisma = new PrismaClient()

interface updateAdvertType extends advertInputType {
  id: string
}

//(parent, args, context, info)
export const resolvers = {
  Query: {
    allAdverts: async (_: any, { userId}: any) => {
      return await prisma.advert.findMany({
         where: {userId: userId}
      })
    },
    advert: async (_: any, { id }: any) => {
      return await prisma.advert.findFirst({
        where: { id: id },
      })
    },
  },

  Mutation: {
    createAdvert: async (
      _: any,
      { advertInput: { title, description, price, picture, userId } }: advertInputType
    ) => {
      return await prisma.advert.create({
        data: {
          title: title,
          description: description,
          price: price,
          picture: picture,
          userId: userId
        },
      })
    },
    updateAdvert: async (
      _: any,
      { id, advertInput: { title, description, price, picture } }: updateAdvertType
    ) => {
      return await prisma.advert.update({
        where: { id: id },
        data: {
          title: title,
          description: description,
          price: price,
          picture: picture,
        }
      })
    },
    deleteAdvert: async (
      _: any,
      { id }: {id: string}
    ) => {
      return await prisma.advert.delete({
        where: { id: id },
      })
    },
  },
}
