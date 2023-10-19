import { useRouter } from "next/router";
import { api } from "~/utils/api";


const ProductPage = () => {

  const allProducts = api.product.getAllProducts.useQuery().data;
console.log(allProducts, "products")
  const router = useRouter();
  return <div>{router.query.id}</div>;
};

export default ProductPage;
