import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";
import Search from "../Components/SearchCompo";

export function Artists() {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]); // Artistes filtrés
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistsResponse = await fetch("http://localhost:8000/artists");
        if (!artistsResponse.ok) {
          throw new Error(`HTTP error! status: ${artistsResponse.status}`);
        }
        const artistsData = await artistsResponse.json();
        setArtists(artistsData);
        setFilteredArtists(artistsData); // Initialiser les artistes filtrés
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artists:", error);
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Artists pagination
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = filteredArtists.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  );

  // Calcul total des pages
  const totalPages = Math.ceil(filteredArtists.length / artistsPerPage);

  const handleArtistClick = (artistId) => {
    navigate(`/artists/${artistId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Artists</h1>
      <Search
        data={artists}
        searchKey="name" // Recherche par le nom de l'artiste
        onSearch={setFilteredArtists}
      />
      {loading ? (
        <p className="text-center">Loading artists...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArtists.map((artist) => (
              <div
                key={artist.id}
                className="bg-white rounded shadow p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold">{artist.name}</h2>
                  <p className="text-gray-500">{artist.genre}</p>
                </div>
                <button
                  onClick={() => handleArtistClick(artist.id)}
                  className="bg-green-500 hover:bg-green-600 transition-all duration-350 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
                >
                  View Albums
                </button>
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

export default Artists;
