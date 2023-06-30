import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc'
import { writeFormSchema } from '~/components/WriteFormModal'
import slugify from 'slugify'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const postRouter = createTRPCRouter({ 
  create: protectedProcedure
  .input(writeFormSchema)
  .mutation(
    async({ ctx: { prisma, session }, input }) => {

      const ifTitleAlreadyExist = async () => {
        const post = await prisma.post.findUnique({
          where: {
            title: input.title
          }
        })
        return !!post
      }

      if(!await ifTitleAlreadyExist()) {
        await prisma.post.create({
          data: {
            author: {
              connect: {
                id: session.user.id,
              }
            },
            title: input.title,
            description: input.description,
            text: input.text,
            slug: slugify(input.title)
          }
        })
      } else {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Istnieje już post z takim tytułem'
        })
      }
    }
  ),

  getAll: publicProcedure
    .query(async ({ ctx: { prisma }}) => {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          author: {
            select: {
              name: true,
              image: true
            }
          }
        }
      })
      return posts
    }),
  
  getSingle: publicProcedure
    .input(z.object({
      slug: z.string()
    }))
    .query(async ({ ctx: { prisma, session }, input }) => {
      const post = await prisma.post.findUnique({
        where: {
          slug: input.slug
        },
        select: {
          id: true,
          description: true,
          title: true,
          text: true,
          likes: session?.user?.id ? {
            where: {
              userId: session?.user?.id
            }
          } : false
        }
      })

      return post
    }),
    
  likePost: protectedProcedure
    .input(z.object({
      postId: z.string(),
    }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      await prisma.like.create({
        data: {
          userId: session.user.id,
          postId: input.postId
        }
      })
    }),

  dislikePost: protectedProcedure
    .input(z.object({
      postId: z.string(),
    }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      await prisma.like.delete({
        where: {
          userId_postId: {
            postId: input.postId,
            userId: session.user.id
          }
        }
      })
    }),
})