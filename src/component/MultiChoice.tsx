import { Brand, Category, Color, Tags } from "@prisma/client";

type MultiProps = {
  name: string;
  callback: (oldData: any) => void;
  input: Color[] | Category[] | Tags[] | Brand[];
  selected?: Color[] | Category[] | Tags[];
};

const MultiChoice = ({ name, callback, input, selected }: MultiProps) => {
  return (
    <div className="flex gap-4 border-b py-4">
      <label className="w-24 capitalize">{name}:</label>
      <div className="flex gap-6">
        {input?.map((item, index) => {
          let isChecked = false;
          if (selected) {
            isChecked =
              selected.filter((selectItem) => selectItem.id === item.id)
                .length > 0;
          }
          return (
            <div key={`${name}#${index}`} className="flex flex-col gap-1">
              <label htmlFor={`${name}Name#${index}`}>{item.name}</label>
              <input
                type="checkbox"
                defaultChecked={isChecked}
                name={`colorName#${index}`}
                id={`colorId#${index}`}
                className="rounded-lg border border-slate-300"
                onChange={(e) => {
                  callback((oldData: string[]) => {
                    if (e.target.checked) {
                      return [...oldData, item.id];
                    }

                    return oldData.filter((selectedItem: string) => {
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
