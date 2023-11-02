import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { AiOutlineSearch } from "react-icons/ai";
import SearchResultList from "./SearchResultList";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const data = api.product.search.useQuery({ searchTerm }).data;
  // data som hämtas vid ändring i input/onChange

  // filtrering när vi hämtar som körs i handleSearch för varje bokstav vi skriver in
  function filterData(list: object[]) {
    return list.filter((item) => {
      // returnar ifall vi har sökord och item.name innehåller searchTerm ifrån input
      return searchTerm != "" && item.name.toLowerCase().includes(searchTerm);
    });
  }
  const handleSearch = (word: string) => {
    setSearchTerm(word);
    const filteredData = filterData(data);
    setSearchList(filteredData);
  };

  return (
    <div>
      <div
        id="input-wrapper"
        className="focus-outline flex w-36 items-center rounded-md border-2 border-black bg-white"
      >
        <input
          className="w-full rounded-md p-1 focus:outline-none"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <AiOutlineSearch size={30}></AiOutlineSearch>
      </div>
      <SearchResultList searchList={searchList} searchTerm={searchTerm} />
    </div>
  );
};

export default Searchbar;
