import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";
import Search from "../Components/SearchCompo";

export function Albums() {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]); // Albums filtrés
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumsResponse = await fetch("http://localhost:8000/albums");
        if (!albumsResponse.ok) {
          throw new Error(`HTTP error! status: ${albumsResponse.status}`);
        }
        const albumsData = await albumsResponse.json();

        const artistsResponse = await fetch("http://localhost:8000/artists");
        if (!artistsResponse.ok) {
          throw new Error(`HTTP error! status: ${artistsResponse.status}`);
        }
        const artistsData = await artistsResponse.json();

        // Recherche des artistes par rapport aux albums
        const albumsWithArtistDetails = albumsData.map((album) => {
          const artist = artistsData.find(
            (artist) => artist.id === album.artist_id
          );
          return {
            ...album,
            artist_name: artist ? artist.name : "Unknown Artist",
          };
        });

        setAlbums(albumsWithArtistDetails);
        setFilteredAlbums(albumsWithArtistDetails); // Initialiser les albums filtrés
        setLoading(false);
      } catch (error) {
        console.error("Error fetching albums:", error);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  // Albums pagination
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = filteredAlbums.slice(
    indexOfFirstAlbum,
    indexOfLastAlbum
  );

  // Calcul total des pages
  const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);

  const handleAlbumClick = (albumId) => {
    navigate(`/albums/${albumId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Albums</h1>
      <Search
        data={albums}
        searchKey="name" // Recherche par le nom de l'album
        onSearch={setFilteredAlbums}
      />
      {loading ? (
        <p className="text-center text-gray-600">Loading albums...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentAlbums.map((album) => (
              <div
                key={album.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-500 cursor-pointer"
                onClick={() => handleAlbumClick(album.id)}
              >
                <img
                  src={album.cover_small}
                  alt={album.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {album.name}
                  </h3>
                  <p className="text-gray-600">{album.artist_name}</p>
                  {album.popularity && (
                    <p className="text-sm text-gray-500">
                      Popularity: {album.popularity}
                    </p>
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

export default Albums;
