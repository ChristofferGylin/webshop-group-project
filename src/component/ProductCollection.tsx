import { Product } from "@prisma/client";
import ProductCard from "./ProductCard";

const ProductCollection = ({ products }: { products: Product[] }) => {
  
  return (
    <div className="sm-gap-y-5 grid  w-full grid-cols-2 gap-x-3 gap-y-4 p-4 sm:gap-x-4  md:grid-cols-3 md:gap-x-5 md:gap-y-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-7">
      {products.map((product, index) => {
        return (
          <ProductCard
            key={`productCard#${index}`}
            productName={product.name}
            price={product.price}
            brandName={"Brand Name"}
            image={"/red-t.png"}
            discount={product.discount}
            dbId={product.id}
          />
        );
      })}
    </div>
  );
};

export default ProductCollection;
