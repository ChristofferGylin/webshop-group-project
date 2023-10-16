import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  getAllProducts: protectedProcedure.query(({ ctx }) => {
    if (ctx.session.user.role !== "admin") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.db.product.findMany({
      include: {
        category: true,
        color: true,
        images: true,
      },
    });
  }),

  getAllColors: protectedProcedure.query(({ ctx }) => {
    if (ctx.session.user.role !== "admin") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.db.color.findMany();
  }),

  getAllCategories: protectedProcedure.query(({ ctx }) => {
    if (ctx.session.user.role !== "admin") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.db.category.findMany();
  }),

  getAllBrands: protectedProcedure.query(({ ctx }) => {
    if (ctx.session.user.role !== "admin") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.db.brand.findMany();
  }),

  getAllTags: protectedProcedure.query(({ ctx }) => {
    if (ctx.session.user.role !== "admin") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.db.tags.findMany();
  }),

  createColor: protectedProcedure
    .input(z.object({ name: z.string(), tailwindClass: z.string() }))
    .mutation(({ input, ctx }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.db.color.create({
        data: {
          name: input.name,
          tailwindClass: input.tailwindClass,
        },
      });
    }),

  createCategory: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.db.category.create({
        data: {
          name: input.name,
        },
      });
    }),

  createTags: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.db.tags.create({
        data: {
          name: input.name,
        },
      });
    }),

  createProduct: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        text: z.string(),
        discount: z.number(),
        images: z.string().array().optional(),
        color: z.string().array(),
        category: z.string().array(),
        brand: z.string(),
        tags: z.string().array().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const connectCategories = input.category.map((catId) => ({ id: catId }));
      const connectColors = input.color.map((colId) => ({ id: colId }));

      let connectTags: { id: string }[] = [];
      console.log("------------------------------------------------");
      console.log("------------------------------------------------");
      console.log("------------------------------------------------");
      console.log("------------------------------------------------");
      console.log("------------------------------------------------");
      console.log("Brand:", input.brand);
      console.log("------------------------------------------------");
      console.log("------------------------------------------------");
      console.log("------------------------------------------------");
      console.log("------------------------------------------------");
      console.log("------------------------------------------------");

      if (input.tags) {
        connectTags = input.tags.map((tagId) => ({ id: tagId }));
      }

      const newProduct = await ctx.db.product.create({
        data: {
          name: input.name,
          price: input.price,
          text: input.text,
          discount: input.discount,
          brandId: input.brand,
          category: {
            connect: connectCategories,
          },
          color: {
            connect: connectColors,
          },
          tags: {
            connect: connectTags,
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

  createBrand: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        logoId: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const data = input.logoId
        ? { name: input.name, logoId: input.logoId }
        : { name: input.name, logoId: undefined };
      return ctx.db.brand.create({
        data: data,
      });
    }),
});
