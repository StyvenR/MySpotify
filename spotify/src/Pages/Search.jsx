import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("artists"); // Par défaut, recherche par artistes
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Nombre d'éléments par page
  const navigate = useNavigate();

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  // Redirection
  const handleItemClick = (id) => {
    navigate(`/${searchCategory}/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let endpoint = "";
        if (searchCategory === "artists") {
          endpoint = "http://localhost:8000/artists";
        } else if (searchCategory === "albums") {
          endpoint = "http://localhost:8000/albums";
        } else if (searchCategory === "genres") {
          endpoint = "http://localhost:8000/genres";
        }

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filtrer les résultats en fonction du terme de recherche
        const filteredResults = data.filter((item) =>
          item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
        console.log("Filtered results:", filteredResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchData();
    } else {
      setResults([]); // Réinitialiser les résultats si le champ de recherche est vide
    }
  }, [searchTerm, searchCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Search</h1>
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder={`Search ${searchCategory}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="artists">Artists</option>
          <option value="albums">Albums</option>
          <option value="genres">Genres</option>
        </select>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleItemClick(item.id)}
              >
                {searchCategory === "artists" && item.photo && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {searchCategory === "albums" && item.cover_small && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.cover_small}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {item.name}
                  </h3>
                  {searchCategory === "genres" && item.description && (
                    <p className="text-gray-600">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default Search;
