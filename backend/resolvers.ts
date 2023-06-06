import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
//(parent, args, context, info)

export const resolvers = {

  Query: {
    allAdverts: async () => {
      return await prisma.advert.findMany()
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
      { advertInput: { title, description } }: any
    ) => {
      return await prisma.advert.create({
        data: {
          title: title,
          description: description,
        },
      })
    },
    updateAdvert: async (
      _: any,
      { id, AdvertInput: { title, description } }: any
    ) => {
      return await prisma.advert.update({
        where: { id: id },
        data: {
          title: title,
          description: description
        }
      })
    },
    deleteAdvert: async (
      _: any,
      { id }: any
    ) => {
      return await prisma.advert.delete({
        where: { id: id },
      })
    },
  },
}
