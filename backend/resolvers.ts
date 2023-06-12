import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type advertInput = {
  advertInput: {
    title: string,
    price: number,
    description: string,
    picture: string
  }
}

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
      { advertInput: { title, description, price, picture } }: advertInput
    ) => {
      return await prisma.advert.create({
        data: {
          title: title,
          description: description,
          price: price,
          picture: picture,
        },
      })
    },
    updateAdvert: async (
      _: any,
      { id, AdvertInput: { title, description, price, picture } }: any
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
