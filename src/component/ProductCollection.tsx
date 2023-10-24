import ProductCard from "./ProductCard";
import ProductWithRelations from "~/types/ProductWithRelations";

const ProductCollection = ({
  products,
}: {
  products: ProductWithRelations[];
}) => {
  if (!products || products.length === 0) {
    return <></>;
  }

  return (
    <div className="sm-gap-y-5 grid  w-full grid-cols-2 gap-x-3 gap-y-4 p-4 sm:gap-x-4  md:grid-cols-3 md:gap-x-5 md:gap-y-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-7">
      {products.map((product, index) => {
        let brandName = "Noname Brand";
        let productImage = "/images/no-image.png";
        let tagline = "";

        if (product.Brand) {
          brandName = product.Brand.name;
        }

        if (product.images && product.images.length > 0) {
          const sortedImage = product.images.sort((a, b) => {
            if (a.sortOrder > b.sortOrder) {
              return 1;
            }
            if (a.sortOrder < b.sortOrder) {
              return -1;
            }
            return 0;
          })[0]?.url;

          if (sortedImage) {
            productImage = sortedImage;
          }
        }

        if (product.tagline) {
          tagline = product.tagline;
        }
        return (
          <ProductCard
            key={`productCard#${index}`}
            productName={product.name}
            price={product.price}
            brandName={product.Brand.name}
            image={productImage}
            discount={product.discount}
            dbId={product.id}
            tagline={tagline}
          />
        );
      })}
    </div>
  );
};

export default ProductCollection;
