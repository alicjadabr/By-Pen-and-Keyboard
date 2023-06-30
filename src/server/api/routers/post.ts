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
      .query(async ({ ctx: { prisma }, input }) => {
        const post = await prisma.post.findUnique({
          where: {
            slug: input.slug
          }
        })

        return post
      }),
})