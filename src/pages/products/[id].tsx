import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { nullable } from "zod";
import ProductCard from "~/component/ProductCard";
import { api } from "~/utils/api";

const ProductPage = () => {
  const router = useRouter();
  const id = router.query.id;
  // const [product, setProduct] = useState<Product | null>(null);

  if (!id) {
    router.push("/");
    return null;
  }

  const response = api.product.getUnique.useQuery({
    id,
    onSuccess: handleSuccess,
  });

  function handleSuccess(data) {
    if (data.error || !data.data) {
      router.push("/");
      return null;
    }
  }

  const product = response.data;
  if (!product) {
    return <div>Loading</div>;
  }

  return (
    <div className="m-6 flex flex-col items-center">
      <div className="grid w-full grid-cols-1 border border-red-400 md:grid-cols-2">
        <div>
          <Image
            width={320}
            height={400}
            src={"/images/no-image.png"}
            alt={`${product.name} Product Image`}
            className="w-full"
          />
        </div>
        <div className="flex flex-col border-2 p-2">
          <div>{product ? <div>{product.name}</div> : ""}</div>
          <div>{product ? <div>{product.price}</div> : ""}</div>
        </div>
      </div>
      <div className="w-full border border-red-400">
        <h2>Description</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          soluta, commodi consequatur ipsum itaque fuga voluptatum! Veritatis
          libero ipsam veniam. Error fuga eius, molestiae in nesciunt pariatur
          facere sit necessitatibus?
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
