import { type Prisma } from "@prisma/client";

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    Brand: true;
    images: true;
    color: true;
    category: true;
  };
}>;

export default ProductWithRelations;
