import { Product } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({

  getAllProducts: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany();
  }),

  createColor: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.color.create({
        data: {
          name: input.name
        }
      })
    }),

  createCategory: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.color.create({
        data: {
          name: input.name
        }
      })
    }),

  createProduct: publicProcedure
    .input(z.object({ name: z.string(), price: z.number(), text: z.string(), discount: z.number().optional(), images: z.string().array().optional(), color: z.string().array(), category: z.string().array() }))
    .mutation(async ({ input, ctx }) => {

      let discount = null;

      if (input.discount) {
        discount = input.discount;
      }

      const connectCategories = input.category.map(catId => ({ id: catId }))
      const connectColors = input.color.map(colId => ({ id: colId }))

      const newProduct = await ctx.db.product.create({
        data: {
          name: input.name,
          price: input.price,
          text: input.text,
          discount: discount,
          category: {
            connect: connectCategories,
          },
          color: {
            connect: connectColors,
          }
        }
      })

      if (input.images) {

        const connectImages = input.images.map(imgId => ({ id: imgId }))

        const updatedProduct = await ctx.db.product.update({
          where: {
            id: newProduct.id
          },
          data: {
            images: {
              connect: connectImages,
            }
          }
        })

        return updatedProduct;

      }

      return newProduct
    }),
});
