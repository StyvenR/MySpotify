import React, { useState, useEffect } from "react";

function Search({ data, searchKey, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const results = data.filter((item) =>
      item[searchKey].toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    onSearch(results); // Renvoie les résultats filtrés au parent
  }, [searchTerm, data, searchKey, onSearch]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

export default Search;
