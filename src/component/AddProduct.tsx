import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import {
  Category,
  Color,
  Tags,
  type Product,
  Brand,
  ProductImage,
} from "@prisma/client";
import MultiChoice from "./MultiChoice";
import ImageUpload from "./ImageUpload";
import Image from "next/image";

type AddProductType = {
  id?: string;
};

const AddProduct = ({ id }: AddProductType) => {
  const createProduct = api.admin.createProduct.useMutation();
  const updateProduct = api.admin.updateProduct.useMutation();
  const allColors: Color[] | undefined = api.admin.getAllColors.useQuery().data;
  const allCategories: Category[] | undefined =
    api.admin.getAllCategories.useQuery().data;
  const allBrands: Brand[] | undefined = api.admin.getAllBrands.useQuery().data;
  const allTags: Tags[] | undefined = api.admin.getAllTags.useQuery().data;

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [update, setUpdate] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [text, setText] = useState("");
  const [tagline, setTagline] = useState("");
  const [images, setImages] = useState<ProductImage[]>([]);

  useEffect(() => {
    if (!allBrands || !allBrands[0]) return;

    setSelectedBrand(allBrands[0].id);
  }, [allBrands]);

  let dbProduct:
    | (Product & { color: Color[] } & { category: Category[] } & {
        tags: Tags[];
      } & { images: ProductImage[] })
    | null
    | undefined;

  if (id) {
    dbProduct = api.admin.getProductById.useQuery({ id }).data;
  }

  useEffect(() => {
    if (!dbProduct) return;

    setUpdate(true);
    setName(dbProduct.name);
    setPrice(`${dbProduct.price}`);
    setDiscount(`${dbProduct.discount}`);
    setText(dbProduct.text);
    const cols = dbProduct.color.map((col) => col.id);
    setSelectedColors(cols);
    const cats = dbProduct.category.map((cat) => cat.id);
    setSelectedCats(cats);
    const tags = dbProduct.tags.map((tag) => tag.id);
    setSelectedTags(tags);
    setImages(dbProduct.images);
  }, [dbProduct]);

  const prodSubmit = async () => {
    const data = {
      name: name,
      price: +price,
      discount: +discount,
      text: text,
      color: [...selectedColors],
      category: [...selectedCats],
      tags: [...selectedTags],
      brand: selectedBrand,
    };

    if (update && id) {
      await updateProduct.mutateAsync({ data, id });
      return;
    }

    await createProduct.mutateAsync(data);
  };

  const handleImageUpload = (newImg: ProductImage) => {
    console.log(newImg);
    setImages((oldData) => {
      return [...oldData, newImg];
    });
  };

  return (
    <div className="flex max-h-full w-full flex-col gap-4 overflow-auto border-b bg-slate-300 px-2 py-4">
      <h1 className="text-2xl">
        {update ? "Update product" : "Add a product"}
      </h1>
      {update && id && (
        <div className=" border-b pb-4">
          <h2 className="pb-2 text-xl">Images</h2>
          <div className="flex h-28 w-full gap-2">
            <ImageUpload
              imgType="products"
              parentId={id}
              callback={handleImageUpload}
            />
            <ul className="flex h-full w-full items-center gap-2 rounded-xl border border-slate-500 bg-slate-200 p-2 shadow-inner">
              {images.map((img, index) => {
                return (
                  <li
                    key={`ProductImage#${index}`}
                    className="relative flex aspect-square h-full items-center justify-center shadow-lg"
                  >
                    <Image
                      src={img.url}
                      fill={true}
                      alt="Product Image"
                      className="object-cover"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={prodSubmit} className="w-full">
        <div className="flex flex-wrap justify-center gap-12 border-b pb-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="name" className="w-14">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="rounded-lg border border-slate-300"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="price" className="w-14">
              Price:
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="rounded-lg border border-slate-300"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="discount" className="w-14">
              Discount:
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              className="rounded-lg border border-slate-300"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="name" className="w-14">
              Text:
            </label>
            <input
              type="text"
              name="text"
              id="text"
              className="rounded-lg border border-slate-300"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
        </div>
        {allColors && (
          <MultiChoice
            input={allColors}
            name={"color"}
            callback={setSelectedColors}
            selected={dbProduct?.color}
          />
        )}

        {allCategories && (
          <MultiChoice
            input={allCategories}
            name={"category"}
            callback={setSelectedCats}
            selected={dbProduct?.category}
          />
        )}
        <select
          value={dbProduct?.brandId || selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value);
          }}
        >
          {allBrands &&
            allBrands.map((brand, index) => {
              return (
                <option key={`brandSelect#${index}`} value={brand.id}>
                  {brand.name}
                </option>
              );
            })}
        </select>

        {allTags && (
          <MultiChoice
            input={allTags}
            name={"tags"}
            callback={setSelectedTags}
            selected={dbProduct?.tags}
          />
        )}

        <div className="w-1/7 flex gap-4">
          {update ? (
            <button
              type="submit"
              className="rounded-lg border border-slate-300 bg-slate-100 px-2 py-1 hover:bg-slate-200"
            >
              Update product
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-lg border border-slate-300 bg-slate-100 px-2 py-1 hover:bg-slate-200"
            >
              Create product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
