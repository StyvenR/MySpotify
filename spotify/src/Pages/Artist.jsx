import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function Artist() {
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]); // État pour les albums
  const [loading, setLoading] = useState(true);
  const { artistId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        // Récupérer les détails de l'artiste
        const artistResponse = await fetch(
          `http://localhost:8000/artists/${artistId}`
        );
        if (!artistResponse.ok) {
          throw new Error(`HTTP error! status: ${artistResponse.status}`);
        }
        const artistData = await artistResponse.json();
        setArtist(artistData);

        // Récupérer les albums de l'artiste
        const albumsResponse = await fetch(
          `http://localhost:8000/albums/artist/${artistId}`
        );
        if (!albumsResponse.ok) {
          throw new Error(`HTTP error! status: ${albumsResponse.status}`);
        }
        const albumsData = await albumsResponse.json();
        setAlbums(albumsData); // Mettre à jour les albums

        setLoading(false);
      } catch (error) {
        console.error("Error fetching artist details or albums:", error);
        setLoading(false);
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  if (loading) {
    return <p className="text-center">Loading artist details...</p>;
  }

  if (!artist) {
    return <p className="text-center text-red-600">Artist not found.</p>;
  }

  const handleAlbumClick = (albumId) => {
    navigate(`/albums/${albumId}`);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">{artist.name}</h1>
          <div className="mb-6 flex flex-col md:flex-row items-center gap-6">
            <img
              src={artist?.photo}
              alt={artist?.name || "Artist"}
              className="w-64 h-64 object-cover rounded"
            />
            <div>
              <h2 className="text-xl font-bold">Biography</h2>
              <p>{artist.bio}</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">Albums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums.map((album) => (
              <div
                key={album.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-500 cursor-pointer"
                onClick={() => handleAlbumClick(album.id)}
              >
                <img
                  src={album.cover}
                  alt={album.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {album.name}
                  </h3>
                  {album.release_date && (
                    <p className="text-sm text-gray-500">
                      Released: {album.release_date}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
