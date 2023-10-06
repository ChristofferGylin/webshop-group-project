import AddColor from "~/component/AddColor";
import AddProduct from "~/component/AddProduct";
import ProductList from "~/component/ProductList";
import { useState } from "react";
import AddCategory from "~/component/AddCategory";
import { AiFillCloseCircle } from "react-icons/ai";
import AddTags from "~/component/AddTags";
import SignInButton from "~/component/SignInButton";
import { useSession } from "next-auth/react";

const Admin = () => {

  const { data: session } = useSession();

  console.log(session)
  const [productModal, setProductModal] = useState(false);
  const [colorModal, setColorModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tagModal, setTagModal] = useState(false);
  const toggleModal = () => {
    setProductModal(false);
    setColorModal(false);
    setCategoryModal(false);
    setTagModal(false);
    setModalOpen((value) => !value);
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed flex h-screen w-screen items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="max-h-3/4 relative w-3/4 overflow-auto rounded-lg">
            <AiFillCloseCircle
              className="absolute right-2 top-2 fill-slate-700 text-xl hover:fill-red-700"
              onClick={() => {
                toggleModal();
              }}
            />
            {productModal && <AddProduct />}
            {colorModal && <AddColor />}
            {categoryModal && <AddCategory />}
            {tagModal && <AddTags />}
          </div>
        </div>
      )}
      <SignInButton />
      <div className="flex justify-center gap-8">
        <button
          className="m-4 rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-xl hover:bg-slate-200"
          onClick={() => {
            toggleModal();
            setProductModal(true);
          }}
        >
          Add a product
        </button>
        <button
          className="m-4 rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-xl hover:bg-slate-200"
          onClick={() => {
            toggleModal();
            setColorModal(true);
          }}
        >
          Add a color
        </button>
        <button
          className="m-4 rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-xl hover:bg-slate-200"
          onClick={() => {
            toggleModal();
            setCategoryModal(true);
          }}
        >
          Add a category
        </button>

        <button
          className="m-4 rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-xl hover:bg-slate-200"
          onClick={() => {
            toggleModal();
            setTagModal(true);
          }}
        >
          Add tags
        </button>
      </div>
      <div className="m-3 overflow-hidden rounded-lg border bg-slate-200 text-slate-700">
        <ProductList />
      </div>
    </>
  );
};

export default Admin;
