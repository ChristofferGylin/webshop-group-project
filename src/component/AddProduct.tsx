import { api } from '~/utils/api';
import { useState } from 'react';
import { type Product } from '@prisma/client';

const AddProduct = () => {

    const createProduct = api.admin.createProduct.useMutation();
    const allColors = api.admin.getAllColors.useQuery().data;
    const allCategories = api.admin.getAllCategories.useQuery().data;

    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedCats, setSelectedCats] = useState<string[]>([]);

    const [prodData, setProdData] = useState<
        Pick<Product, 'name' | 'price' | 'text' | 'discount'>
    >({ name: '', price: 0, discount: 0, text: '' })


    const prodSubmit = async () => {

        console.log('selectedCats:', selectedCats)

        await createProduct.mutateAsync({
            ...prodData,
            color: [...selectedColors],
            category: [...selectedCats],

        })
    }

    return (
        <div className="flex flex-col gap-4 border-b py-4 px-2 bg-slate-300 w-full h-full">
            <div className="text-2xl">
                Add a product
            </div>
            <form onSubmit={prodSubmit} className="w-full">
                <div className="flex flex-wrap justify-center gap-12 border-b py-4">
                    <div className="flex flex-col gap-4">
                        <label htmlFor="name" className='w-14'>Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="border-slate-300 border rounded-lg"
                            onChange={(e) => {
                                setProdData((oldData) => {
                                    return {
                                        ...oldData,
                                        name: e.target.value
                                    }
                                })
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="price" className='w-14'>Price:</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            className="border-slate-300 border rounded-lg"
                            onChange={(e) => {
                                setProdData((oldData) => {
                                    return {
                                        ...oldData,
                                        price: +e.target.value
                                    }
                                })
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="discount" className='w-14'>Discount:</label>
                        <input
                            type="number"
                            name="discount"
                            id="discount"
                            className="border-slate-300 border rounded-lg"
                            onChange={(e) => {
                                setProdData((oldData) => {
                                    return {
                                        ...oldData,
                                        discount: +e.target.value
                                    }
                                })
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="name" className='w-14'>Text:</label>
                        <input
                            type="text"
                            name="text"
                            id="text"
                            className="border-slate-300 border rounded-lg"
                            onChange={(e) => {
                                setProdData((oldData) => {
                                    return {
                                        ...oldData,
                                        text: e.target.value
                                    }
                                })
                            }}
                        />
                    </div>


                </div>

                <div className="flex gap-4 border-b py-4">
                    <label className='w-24'>Color:</label>
                    <div className='flex gap-6'>
                        {allColors?.map((color, index) => {
                            return (
                                <div key={`color#${index}`} className='flex flex-col gap-1'>
                                    <label htmlFor={`colorName#${index}`}>{color.name}</label>
                                    <input

                                        type="checkbox"
                                        name={`colorName#${index}`}
                                        id={`colorId#${index}`}
                                        className="border-slate-300 border rounded-lg"
                                        onChange={(e) => {

                                            setSelectedColors((oldData) => {

                                                if (e.target.checked) {

                                                    return [...oldData, color.id]

                                                }

                                                return oldData.filter((selectedCol) => {
                                                    return selectedCol !== color.id
                                                })


                                            })
                                        }}
                                    />
                                </div>

                            )
                        })}
                    </div>

                </div>
                <div className="w-1/7 flex gap-4 py-4">
                    <label className='w-24'>Category:</label>
                    <div className='flex gap-6'>
                        {allCategories?.map((category, index) => {
                            return (
                                <div key={`category#${index}`} className='flex flex-col gap-1'>
                                    <label htmlFor={`categoryName#${index}`}>{category.name}</label>
                                    <input

                                        type="checkbox"
                                        name={`categoryName#${index}`}
                                        id={`categoryId#${index}`}
                                        className="border-slate-300 border rounded-lg"
                                        onChange={(e) => {

                                            setSelectedCats((oldData) => {

                                                if (e.target.checked) {

                                                    return [
                                                        ...oldData,
                                                        category.id
                                                    ]

                                                }

                                                return oldData.filter((selectedCat) => {
                                                    return selectedCat !== category.id
                                                })

                                            })
                                        }}
                                    />
                                </div>

                            )
                        })}
                    </div>

                </div>

                <div className="w-1/7 flex gap-4">
                    <button type='submit' className='border bg-slate-100 hover:bg-slate-200 border-slate-300 rounded-lg px-2 py-1'>Submit</button>
                </div>

            </form>
        </div>
    )

}

export default AddProduct;