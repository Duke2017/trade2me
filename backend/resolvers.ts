import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    allAdverts: async () => {
        return prisma.advert.findMany();
      },
  },
  Mutation: {
    createAdvert: async (_, {AdvertInput: {title, description}}) => {
      //return prisma.advert.new?
    },
  }
}