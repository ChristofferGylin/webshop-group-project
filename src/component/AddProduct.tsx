import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { Category, Color, Tags, type Product, Brand } from "@prisma/client";
import MultiChoice from "./MultiChoice";

const AddProduct = () => {
  const createProduct = api.admin.createProduct.useMutation();
  const allColors: Color[] = api.admin.getAllColors.useQuery().data;
  const allCategories: Category[] = api.admin.getAllCategories.useQuery().data;
  const allBrands: Brand[] = api.admin.getAllBrands.useQuery().data;
  const allTags: Tags[] = api.admin.getAllTags.useQuery().data;

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (!allBrands || !allBrands[0]) return;

    setSelectedBrand(allBrands[0].id);
  }, [allBrands]);

  const [prodData, setProdData] = useState<
    Pick<Product, "name" | "price" | "text" | "discount">
  >({ name: "", price: 0, discount: 0, text: "" });

  const prodSubmit = async () => {
    await createProduct.mutateAsync({
      ...prodData,
      color: [...selectedColors],
      category: [...selectedCats],
      tags: [...selectedTags],
      brand: selectedBrand,
    });
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 border-b bg-slate-300 px-2 py-4">
      <div className="text-2xl">Add a product</div>
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
              onChange={(e) => {
                setProdData((oldData) => {
                  return {
                    ...oldData,
                    name: e.target.value,
                  };
                });
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
              onChange={(e) => {
                setProdData((oldData) => {
                  return {
                    ...oldData,
                    price: +e.target.value,
                  };
                });
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
              onChange={(e) => {
                setProdData((oldData) => {
                  return {
                    ...oldData,
                    discount: +e.target.value,
                  };
                });
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
              onChange={(e) => {
                setProdData((oldData) => {
                  return {
                    ...oldData,
                    text: e.target.value,
                  };
                });
              }}
            />
          </div>
        </div>
        <MultiChoice
          input={allColors}
          name={"color"}
          callback={setSelectedColors}
        />
        <MultiChoice
          input={allCategories}
          name={"category"}
          callback={setSelectedCats}
        />
        <select
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

        <MultiChoice input={allTags} name={"tags"} callback={setSelectedTags} />

        <div className="w-1/7 flex gap-4">
          <button
            type="submit"
            className="rounded-lg border border-slate-300 bg-slate-100 px-2 py-1 hover:bg-slate-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
