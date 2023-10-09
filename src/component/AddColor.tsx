import { api } from "~/utils/api";
import { useState } from "react";
import { type Color } from "@prisma/client";

const AddColor = () => {
  const createColor = api.admin.createColor.useMutation();

  const [colorData, setColorData] = useState<
    Pick<Color, "name" | "tailwindClass">
  >({ name: "", tailwindClass: "" });

  const colorSubmit = async () => {
    await createColor.mutateAsync({ ...colorData });
  };

  return (
    <div className="flex flex-col gap-4 border-b bg-slate-300 px-2 py-4">
      <div className="text-2xl">Add a color</div>
      <form onSubmit={colorSubmit} className="flex gap-12">
        <div className="flex gap-4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className="rounded-lg border border-slate-300"
            onChange={(e) => {
              setColorData((oldData) => {
                return { ...oldData, name: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="tailwindClass">Tailwind Class:</label>
          <input
            type="text"
            name="tailwindClass"
            id="tailwindClass"
            className="rounded-lg border border-slate-300"
            onChange={(e) => {
              setColorData((oldData) => {
                return { ...oldData, tailwindClass: e.target.value };
              });
            }}
          />
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

export default AddColor;
