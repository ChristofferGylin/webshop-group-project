import Link from "next/link";

const SearchResultList = ({ searchList, searchTerm }) => {
  // om längden på ordet == 0 dvs "", skicka inte tillbaks ett resultat
  // detta kan ändras beroende på hur mkt vi vill skicka tillbaks
  if (searchTerm.length === 0) {
    return;
  }
  // nedan returneras en div med en lista, har gömt overflow
  return (
    <div className="absolute max-h-48 w-36 overflow-x-hidden overflow-y-hidden">
      {searchList.map((item: any, index: any) => {
        return (
          <Link href={`/products/${item.dbId}`} key={index}>
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
