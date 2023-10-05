import AddColor from '~/component/AddColor';
import AddProduct from '~/component/AddProduct';
import ProductList from '~/component/ProductList';
import AddCategory from '~/component/AddCategory';
import AddBrand from '~/component/AddBrand'; // Ny import
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

const Admin = () => {

    const [productModal, setProductModal] = useState(false);
    const [colorModal, setColorModal] = useState(false);
    const [categoryModal, setCategoryModal] = useState(false);
    const [brandModal, setBrandModal] = useState(false);  // Ny state
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setProductModal(false);
        setColorModal(false);
        setCategoryModal(false);
        setBrandModal(false);  // Stäng av brandModal
        setModalOpen(value => !value);
    }

    return (
        <>
            {modalOpen &&
                <div className='flex justify-center items-center fixed w-screen h-screen bg-black/50 backdrop-blur-sm'>
                    <div className='w-3/4 max-h-3/4 overflow-auto rounded-lg relative'>
                        <AiFillCloseCircle className='absolute top-2 right-2 text-xl fill-slate-700 hover:fill-red-700' onClick={toggleModal} />
                        {productModal && <AddProduct />}
                        {colorModal && <AddColor />}
                        {categoryModal && <AddCategory />}
                        {brandModal && <AddBrand />}  
                    </div>
                </div>}
            <div className='flex justify-center gap-8'>
                <button
                    className='border bg-slate-100 hover:bg-slate-200 border-slate-300 rounded-lg text-xl px-4 py-2 m-4'
                    onClick={() => {
                        toggleModal();
                        setProductModal(true);
                    }}
                >Add a product</button>
                <button
                    className='border bg-slate-100 hover:bg-slate-200 border-slate-300 rounded-lg text-xl px-4 py-2 m-4'
                    onClick={() => {
                        toggleModal();
                        setColorModal(true);
                    }}
                >Add a color</button>
                <button
                    className='border bg-slate-100 hover:bg-slate-200 border-slate-300 rounded-lg text-xl px-4 py-2 m-4'
                    onClick={() => {
                        toggleModal();
                        setCategoryModal(true);
                    }}
                >Add a category</button>
                <button
                    className='border bg-slate-100 hover:bg-slate-200 border-slate-300 rounded-lg text-xl px-4 py-2 m-4'
                    onClick={() => {
                        toggleModal();
                        setBrandModal(true);  // Ny rad
                    }}
                >Add a brand</button>  
            </div>
            <div className="m-3 bg-slate-200 rounded-lg border overflow-hidden text-slate-700">
                <ProductList />
            </div>
        </>
    )
}

export default Admin;
