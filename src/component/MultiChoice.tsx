import { Brand, Category, Color, Tags } from "@prisma/client";

type MultiProps = {
  name: string;
  callback: (oldData: string[]) => void;
  input: Color[] | Category[] | Tags[] | Brand[];
};

const MultiChoice = ({ name, callback, input }: MultiProps) => {
  return (
    <div className="flex gap-4 border-b py-4">
      <label className="w-24 capitalize">{name}:</label>
      <div className="flex gap-6">
        {input?.map((item, index) => {
          return (
            <div key={`${name}#${index}`} className="flex flex-col gap-1">
              <label htmlFor={`${name}Name#${index}`}>{item.name}</label>
              <input
                type="checkbox"
                name={`colorName#${index}`}
                id={`colorId#${index}`}
                className="rounded-lg border border-slate-300"
                onChange={(e) => {
                  callback((oldData) => {
                    if (e.target.checked) {
                      return [...oldData, item.id];
                    }

                    return oldData.filter((selectedItem) => {
                      return selectedItem !== item.id;
                    });
                  });
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiChoice;
