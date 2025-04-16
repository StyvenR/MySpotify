import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Search from "../Components/SearchCompo";
import Pagination from "../Components/Pagination";

export function Genre() {
  const { genreId } = useParams();
  const [genre, setGenre] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]); // Artistes filtrés
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenreDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/genres/${genreId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data :", data);
        const albumResponse = await fetch(`http://localhost:8000/albums`);
        if (!albumResponse.ok) {
          throw new Error(`HTTP error! status: ${albumResponse.status}`);
        }
        const albumData = await albumResponse.json();

        setGenre(data.genre);
        setAlbums(albumData.filter((album) => data.albums.includes(album.id)));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching album details:", error);
        setLoading(false);
      }
    };

    fetchGenreDetails();
  }, [genreId]);

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = filteredGenres.slice(
    indexOfFirstAlbum,
    indexOfLastAlbum
  );
  const totalPages = Math.ceil(filteredGenres.length / albumsPerPage);

  if (loading) {
    return <p className="text-center">Loading genre details...</p>;
  }

  if (!genre) {
    return <p className="text-center text-red-600">Genre not found.</p>;
  }

  const handleGenreClick = (albumId) => {
    navigate(`/albums/${albumId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{genre?.name}</h1>
      <Search
        data={albums}
        searchKey="name" // Recherche par le nom de l'artiste
        onSearch={setFilteredGenres}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentAlbums.map((album) => (
          <div
            key={album.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => handleGenreClick(album.id)}
          >
            <img
              src={album.cover_small}
              alt={album.name}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold p-3 truncate">{album.name}</h2>
          </div>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Genre;
