import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      include: {
        category: true,
        color: true,
        images: true,
      },
    });
  }),

  getAllColors: publicProcedure.query(({ ctx }) => {
    return ctx.db.color.findMany();
  }),

  getAllCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany();
  }),

  createColor: publicProcedure
    .input(z.object({ name: z.string(), tailwindClass: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.color.create({
        data: {
          name: input.name,
          tailwindClass: input.tailwindClass,
        },
      });
    }),

  createCategory: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.category.create({
        data: {
          name: input.name,
        },
      });
    }),

    createTags: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.tags.create({
        data: {
          name: input.name
        }
      })
    }),

  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        text: z.string(),
        discount: z.number(),
        images: z.string().array().optional(),
        color: z.string().array(),
        category: z.string().array(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const connectCategories = input.category.map((catId) => ({ id: catId }));
      const connectColors = input.color.map((colId) => ({ id: colId }));

      const newProduct = await ctx.db.product.create({
        data: {
          name: input.name,
          price: input.price,
          text: input.text,
          discount: input.discount,
          category: {
            connect: connectCategories,
          },
          color: {
            connect: connectColors,
          },
        },
      });

      if (input.images) {
        const connectImages = input.images.map((imgId) => ({ id: imgId }));

        const updatedProduct = await ctx.db.product.update({
          where: {
            id: newProduct.id,
          },
          data: {
            images: {
              connect: connectImages,
            },
          },
        });

        return updatedProduct;
      }

      return newProduct;
    }),

  createBrand: publicProcedure
    .input(
      z.object({
        name: z.string(),
        logoId: z.number().int().optional(), // Anpassad för att ta emot en integer
      }),
    )
    .mutation(({ input, ctx }) => {
      const data = input.logoId
        ? { name: input.name, logoId: input.logoId }
        : { name: input.name };
      return ctx.db.brand.create({
        data: data,
      });
    }),
});
