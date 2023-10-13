import { useRouter } from "next/router";

const ProductPage = () => {
  const router = useRouter();
  return <div>{router.query.id}</div>;
};

export default ProductPage;
