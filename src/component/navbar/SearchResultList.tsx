import Link from "next/link";
import { Product } from "@prisma/client";

interface SearchResultListProps {
  searchList: Product[];
  searchTerm: String;
}

const SearchResultList = ({
  searchList,
  searchTerm,
}: SearchResultListProps) => {
  // om längden på ordet == 0 dvs "", skicka inte tillbaks ett resultat
  // detta kan ändras beroende på hur mkt vi vill skicka tillbaks
  if (searchTerm.length === 0) {
    return;
  }
  // nedan returneras en div med en lista, har gömt overflow
  return (
    <div className="absolute max-h-48 w-36 overflow-x-hidden overflow-y-hidden">
      {searchList.map((item, index) => {
        return (
          <Link href={`/products/${item.id}`} key={index}>
            <div
              className="w-full rounded-md p-1 hover:bg-gray-200"
              key={index}
            >
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResultList;
