import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { Category, Color, Tags, type Product, Brand } from "@prisma/client";
import MultiChoice from "./MultiChoice";

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

  useEffect(() => {
    if (!allBrands || !allBrands[0]) return;

    setSelectedBrand(allBrands[0].id);
  }, [allBrands]);

  let dbProduct:
    | (Product & { color: Color[] } & { category: Category[] } & {
        tags: Tags[];
      })
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

  return (
    <div className="flex h-full w-full flex-col gap-4 border-b bg-slate-300 px-2 py-4">
      <div className="text-2xl">
        {update ? "Update product" : "Add a product"}
      </div>
      <form onSubmit={prodSubmit} className="w-full">
        <div className="flex flex-wrap justify-center gap-12 border-b py-4">
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
