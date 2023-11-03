import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { AiOutlineSearch } from "react-icons/ai";
import SearchResultList from "./SearchResultList";
import { Product } from "@prisma/client";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState<Product[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const data = api.product.search.useQuery({ searchTerm }).data;

  const handleSearch = (word: string) => {
    setSearchTerm(word);
    if (typeof data !== "undefined") {
      setSearchList(data);
    }
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
