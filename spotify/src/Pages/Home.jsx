import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const [recommendedAlbums, setRecommendedAlbums] = useState([]);
  const [recommendedArtists, setRecommendedArtists] = useState([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [loadingArtists, setLoadingArtists] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://localhost:8000/albums");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const albums = await response.json();

        // Sélection de 10 albums aléatoires
        const shuffledAlbums = albums.sort(() => 0.5 - Math.random());
        console.log("shuffledAlbums:", albums);
        const randomAlbums = shuffledAlbums.slice(0, 10);

        setRecommendedAlbums(randomAlbums);
        setLoadingAlbums(false);
      } catch (error) {
        console.error("Error fetching albums:", error);
        setLoadingAlbums(false);
      }
    };

    const fetchArtists = async () => {
      try {
        const response = await fetch("http://localhost:8000/artists");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const artists = await response.json();

        // Sélectionner 10 artistes aléatoires
        const shuffledArtists = artists.sort(() => 0.5 - Math.random());
        const randomArtists = shuffledArtists.slice(0, 10);

        setRecommendedArtists(randomArtists);
        setLoadingArtists(false);
      } catch (error) {
        console.error("Error fetching artists:", error);
        setLoadingArtists(false);
      }
    };

    fetchAlbums();
    fetchArtists();
  }, []);

  const handleAlbumClick = (albumId) => {
    navigate(`/albums/${albumId}`);
  };

  const handleArtistClick = (artistId) => {
    navigate(`/artists/${artistId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Recommended Albums
      </h1>
      {loadingAlbums ? (
        <p className="text-center text-gray-600">
          Loading album recommendations...
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {recommendedAlbums.map((album) => (
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
                <h3 className="text-lg font-semibold truncate">{album.name}</h3>
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
      )}

      <h1 className="text-3xl font-bold mb-6 text-center">
        Recommended Artists
      </h1>
      {loadingArtists ? (
        <p className="text-center text-gray-600">
          Loading artist recommendations...
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {recommendedArtists.map((artist) => (
            <div
              key={artist.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-500 cursor-pointer"
              onClick={() => handleArtistClick(artist.id)}
            >
              <img
                src={artist.photo}
                alt={artist.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">
                  {artist.name}
                </h3>
                {artist.genre && (
                  <p className="text-sm text-gray-500">Genre: {artist.genre}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
