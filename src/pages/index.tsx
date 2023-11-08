import Head from "next/head";
import { api } from "~/utils/api";
import ProductCollection from "~/component/ProductCollection";
import Navbar from "~/component/navbar/Navbar";

export default function Home() {
  const allProducts = api.product.getAllProducts.useQuery().data;

  return (
    <>
      <Head>
        <title>Clothing store</title>
        <meta name="description" content="clothes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen min-h-screen w-full flex-col bg-slate-50">
        <Navbar />

        <div className="grid h-screen w-full items-center justify-center bg-slate-50 ">
          {allProducts && <ProductCollection products={allProducts} />}
        </div>
      </main>
    </>
  );
}
