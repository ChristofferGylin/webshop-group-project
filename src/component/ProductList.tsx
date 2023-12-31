import { api } from "~/utils/api";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ProductList = ({ openEdit }: { openEdit: (id: string) => void }) => {
  const allProducts = api.admin.getAllProducts.useQuery().data;

  return (
    <div className=" px-2 py-4">
      <div className="text-4xl">Products</div>
      <div className="flex flex-col gap-12">
        <div className="flex w-full border-b border-slate-400 py-2">
          <div className="w-1/5 text-lg">Name:</div>
          <div className="w-1/5 text-lg">Category:</div>
          <div className="w-1/5 text-lg">Color:</div>
          <div className="w-1/5 text-lg">Price:</div>
        </div>
        {allProducts?.map((product, index) => {
          return (
            <div
              key={`product#${index}`}
              className="flex w-full border-b border-slate-300 py-2"
            >
              <div className="w-1/5">{product.name}</div>
              <div className="w-1/5">
                <ul>
                  {product.category.map((cat, index) => {
                    return <li key={`productCat#${index}`}>{cat.name}</li>;
                  })}
                </ul>
              </div>
              <div className="w-1/5">
                <ul>
                  {product.color.map((col, index) => {
                    return <li key={`productColor#${index}`}>{col.name}</li>;
                  })}
                </ul>
              </div>
              <div className="w-1/5">{product.price}</div>
              <div className="flex w-1/5 justify-end gap-2">
                <button
                  onClick={() => {
                    openEdit(product.id);
                  }}
                >
                  <AiFillEdit className="fill-slate-700 text-xl hover:fill-slate-500" />
                </button>
                <button>
                  <AiFillDelete className="fill-slate-700 text-xl hover:fill-red-700" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
