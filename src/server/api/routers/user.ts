import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'

export const userRouter = createTRPCRouter({ 
  getUserProfile: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input }) => {
      return await prisma.user.findUnique({
        where: {
          username: input.username,
        },
        select: {
          name: true,
          image: true,
          id: true,
          username: true,
          _count: {
            select: {
              posts: true
            }
          }
        },
      });
    }),
  getUserPosts: publicProcedure
    .input(
      z.object({
        username: z.string()
      })
    )
    .query(async ({ ctx: { prisma, session }, input }) => {
      return await prisma.user.findUnique({
        where: {
          username: input.username
        },
        select: {
          posts: {
            select: {
              id: true,
              slug: true,
              title: true,
              description: true,
              createdAt: true,
              author: {
                select: {
                  name: true,
                  image: true,
                  username: true,
                }
              },
              bookmarks: session?.user?.id ? {
                where: {
                  userId: session?.user?.id
                }
              } : false
            }
          }
        }

      })
    })
})