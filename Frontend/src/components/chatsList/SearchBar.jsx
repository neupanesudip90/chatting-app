import React from 'react'
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <div className="relative flex items-center w-full">
      {/* Search Icon */}
      <span className="absolute left-4 text-gray-600">
        <SearchIcon className="w-5 h-5" />
      </span>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search chats"
        className="
         h-10 pl-13 pr-4 rounded-2xl
        bg-gray-200 text-gray-800 placeholder-gray-500
        focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600
        hover:border hover:border-green-600
        transition duration-200
      "
      />
    </div>
  );
}

export default SearchBar;
