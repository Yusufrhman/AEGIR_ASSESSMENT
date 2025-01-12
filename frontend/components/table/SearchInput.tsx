"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  defaultValue?: string;
  onSearch?: (value: string) => void;
}

export default function SearchInput({
  defaultValue = "",
  onSearch,
}: SearchInputProps) {
  const [searchInput, setSearchInput] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = () => {
    onSearch?.(searchInput);
    router.push(`?search=${searchInput}`);
  };

  return (
    <div className="flex items-center">
      <input
        id="search-input"
        type="text"
        placeholder="Enter search term"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="border border-gray-300 rounded-l p-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded-r px-4 py-2"
      >
        Search
      </button>
    </div>
  );
}
