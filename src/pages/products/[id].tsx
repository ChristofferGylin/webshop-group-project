import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";

const ProductPage = () => {
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
