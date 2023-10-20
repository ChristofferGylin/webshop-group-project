import { useRouter } from "next/router";
import { api } from "~/utils/api";

const ProductPage = () => {

  const allProducts = api.product.getAllProducts.useQuery().data;
console.log(allProducts, "products")
  const router = useRouter();
  const product = api.product.getUnique.useQuery({ id: router.query.id }).data;
  console.log("product: ", product);
  return (
    <div className="flex flex-col items-center">
      <div>{router.query.id}</div>
      <div>{product ? <div>{product.name}</div> : ""}</div>
      <div>{product ? <div>{product.price}</div> : ""}</div>
    </div>
  );
};

export default ProductPage;
