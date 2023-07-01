import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc'
import { writeFormSchema } from '~/components/WriteFormModal'
import slugify from 'slugify'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

const commentSchema = z.object({
  text: z.string().min(10),
  postId: z.string()
})

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
    .query(async ({ ctx: { prisma, session }}) => {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc'
        },
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
            userId: session.user.id,
            postId: input.postId
          }
        }
      })
    }),

  addBookmark: protectedProcedure
    .input(z.object({
      postId: z.string(),
    }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      await prisma.bookmark.create({
        data: {
          userId: session.user.id,
          postId: input.postId
        }
      })
    }),
  
  deleteBookmark: protectedProcedure
    .input(z.object({
      postId: z.string(),
    }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      await prisma.bookmark.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId: input.postId
          }
        }
      })
    }),

  addComment: protectedProcedure
    .input(commentSchema)
    .mutation(
      async({ ctx: { prisma, session }, input }) => {
        await prisma.comment.create({
          data: {
            text: input.text,
            user: {
              connect: {
                id: session.user.id,
              }
            },
            post: {
              connect: {
                id: input.postId
              }
            }
          }
        })
        
      }
    ),
  getComments: publicProcedure
  .input(z.object({
    postId: z.string(),
  }))
  .query(
    async({ ctx: {prisma}, input}) => {
      const comments = await prisma.comment.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        where: {
          postId: input.postId
        },
        select: {
          id: true,
          text: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              image: true
            }
          }
        }
      })

      return comments
    }
  ),

  getReadingList: protectedProcedure
    .query(
      async ({ctx: { prisma, session }}) => {
        const readingList = await prisma.bookmark.findMany({
          where: {
            userId: session.user.id
          },
          take: 4,
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            post: {
              select: {
                title: true,
                description: true,
                createdAt: true,
                slug: true,
                author: {
                  select: {
                    name: true,
                    image: true
                  }
                }
              }
            }
          }
        })
        return readingList
      }
    ),

})