import { useState } from "react";
import { api } from "~/utils/api";
import { type Brand } from "@prisma/client";

const AddBrand: React.FC = () => {
  //  Mutation för att skapa ett varumärke.
  const createBrand = api.admin.createBrand.useMutation();

  const [brandData, setBrandData] = useState<Pick<Brand, "name" | "logoId">>({
    name: "",
    logoId: null,
  });

  const brandSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createBrand.mutateAsync({
      name: brandData.name,
      logoId: brandData.logoId ?? undefined,
    });
  };

  return (
    <div className="flex flex-col gap-4 border-b bg-slate-300 px-2 py-4">
      <div className="text-2xl">Add a brand</div>
      <form onSubmit={brandSubmit} className="flex gap-12">
        <div className="flex gap-4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className="rounded-lg border border-slate-300"
            onChange={(e) => {
              setBrandData((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        </div>
        {/*  Fler fält för varumärket kan läggas till här. */}
        <button
          type="submit"
          className="rounded-lg border border-slate-300 bg-slate-100 px-2 py-1 hover:bg-slate-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
