import { type Category } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";

const AddCategory = () => {
  const createCategory = api.admin.createCategory.useMutation();

  const [catData, setCatData] = useState<Pick<Category, "name">>({ name: "" });

  const catSubmit = async () => {
    await createCategory.mutateAsync({ ...catData });
  };


    const catSubmit = async () => {
        await createCategory.mutateAsync({ ...catData })
    }

    return (
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

export default AddCategory;
