import { type Color, type Category, type Product } from '@prisma/client';
import { useState } from 'react';
import { api } from '~/utils/api';

const Admin = () => {

    const allProducts = api.admin.getAllProducts.useQuery().data;
    const allColors = api.admin.getAllColors.useQuery().data;
    const allCategories = api.admin.getAllCategories.useQuery().data;

    const createColor = api.admin.createColor.useMutation();
    const createCategory = api.admin.createCategory.useMutation();
    const createProduct = api.admin.createProduct.useMutation();

    const [colorData, setColorData] = useState<
        Pick<Color, 'name' | 'tailwindClass'>
    >({ name: '', tailwindClass: '' });
    const [catData, setCatData] = useState<
        Pick<Category, 'name'>
    >({ name: '' });

    const [prodData, setProdData] = useState<
        Pick<Product, 'name' | 'price' | 'text' | 'discount'>
    >({ name: '', price: 0, discount: 0, text: '' })

    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedCats, setSelectedCats] = useState<string[]>([]);

    const colorSubmit = async () => {

        await createColor.mutateAsync({ ...colorData })
    }

    const catSubmit = async () => {

        await createCategory.mutateAsync({ ...catData })
    }

    const prodSubmit = async () => {

        console.log('selectedCats:', selectedCats)

        await createProduct.mutateAsync({
            ...prodData,
            color: [...selectedColors],
            category: [...selectedCats],

        })
    }

    return (
        <div className="m-3 bg-slate-200 rounded-lg border overflow-hidden text-slate-700">
            <div className="flex flex-col gap-4 border-b py-4 px-2 bg-slate-300">
                <div className="text-2xl">
                    Add a product
                </div>
                <form onSubmit={prodSubmit} className="">
                    <div className="flex gap-12 border-b py-4">
                        <div className="w-1/7 flex gap-4">
                            <label htmlFor="name">Name:</label>
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
                        <div className="w-1/4 flex gap-4">
                            <label htmlFor="price">Price:</label>
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
                        <div className="w-1/4 flex gap-4">
                            <label htmlFor="discount">Discount:</label>
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
                        <div className="w-1/4 flex gap-4">
                            <label htmlFor="name">Text:</label>
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
            <div className="flex flex-col gap-4 border-b py-4 px-2 bg-slate-300">
                <div className="text-2xl">
                    Add a color
                </div>
                <form onSubmit={colorSubmit} className="flex gap-12">
                    <div className="flex gap-4">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="border-slate-300 border rounded-lg"
                            onChange={(e) => {
                                setColorData((oldData) => {
                                    return { ...oldData, name: e.target.value }
                                })
                            }}
                        />
                    </div>
                    <div className="flex gap-4">
                        <label htmlFor="tailwindClass">Tailwind Class:</label>
                        <input
                            type="text"
                            name="tailwindClass"
                            id="tailwindClass"
                            className="border-slate-300 border rounded-lg"
                            onChange={(e) => {
                                setColorData((oldData) => {
                                    return { ...oldData, tailwindClass: e.target.value }
                                })
                            }}
                        />
                    </div>
                    <button type='submit' className='border bg-slate-100 hover:bg-slate-200 border-slate-300 rounded-lg px-2 py-1'>Submit</button>
                </form>
            </div>
            <div className="flex flex-col gap-4 border-b py-4 px-2 bg-slate-300">
                <div className="text-2xl">
                    Add a category
                </div>
                <form onSubmit={catSubmit} className="flex gap-12">
                    <div className="flex gap-4">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="border-slate-300 border rounded-lg"
                            onChange={(e) => {
                                setCatData({ name: e.target.value })
                            }}
                        />
                    </div>
                    <button type='submit' className='border bg-slate-100 hover:bg-slate-200 border-slate-300 rounded-lg px-2 py-1'>Submit</button>
                </form>
            </div>
            <div className=' py-4 px-2'>
                <div className="text-4xl">
                    Products
                </div>
                <div className="flex flex-col gap-12">
                    <div className='flex w-full border-b border-slate-400 py-2'>
                        <div className='w-1/4 text-lg'>
                            Name:
                        </div>
                        <div className='w-1/4 text-lg'>
                            Category:
                        </div>
                        <div className='w-1/4 text-lg'>
                            Color:
                        </div>
                        <div className='w-1/4 text-lg'>
                            Price:
                        </div>

                    </div>
                    {allProducts?.map((product, index) => {

                        return (
                            <div key={`product#${index}`} className='flex w-full border-b border-slate-300 py-2'>
                                <div className='w-1/4'>
                                    {product.name}
                                </div>
                                <div className='w-1/4'>
                                    <ul>
                                        {product.category.map((cat, index) => {
                                            return <li key={`productCat#${index}`}>{cat.name}</li>
                                        })}
                                    </ul>

                                </div>
                                <div className='w-1/4'>
                                    <ul>
                                        {product.color.map((col, index) => {
                                            return <li key={`productColor#${index}`}>{col.name}</li>
                                        })}
                                    </ul>
                                </div>
                                <div className='w-1/4'>
                                    {product.price}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>

    )
}

export default Admin;