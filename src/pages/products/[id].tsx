import Image from "next/image";
import { useRouter } from "next/router";
import ProductCard from "~/component/ProductCard";
import { api } from "~/utils/api";

const ProductPage = () => {
  const router = useRouter();
  const id = router.query.id;

  if (typeof id !== "string") {
    router.push("/");
    return;
  }
  const product = api.product.getUnique.useQuery({ id }).data;
  if (!product) {
    router.push("/");
    return;
  }

  return (
    <div className="m-6 flex flex-col items-center">
      <div className="grid grid-cols-1 border border-red-400 md:grid-cols-2 w-full">
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
      <div className="border border-red-400 w-full">
        <h2>Description</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Veritatis soluta, commodi consequatur ipsum itaque fuga voluptatum! 
          Veritatis libero ipsam veniam. Error fuga eius, molestiae in 
          nesciunt pariatur facere sit necessitatibus?</p>
      </div>
    </div>
  );
};

export default ProductPage;
