import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import convertDuration from "../Components/ConvertDuration";

export function Album() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artistsData, setArtistsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/albums/${albumId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const artistsResponse = await fetch("http://localhost:8000/artists");
        if (!artistsResponse.ok) {
          throw new Error(`HTTP error! status: ${artistsResponse.status}`);
        }
        const artistsData = await artistsResponse.json();

        console.log("Fetched album data:", artistsData);
        setAlbum(data.album);
        setTracks(data.tracks);
        setLoading(false);
        setArtistsData(artistsData);
      } catch (error) {
        console.error("Error fetching album details:", error);
        setLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [albumId]);

  if (loading) {
    return <p className="text-center">Loading album details...</p>;
  }

  if (!album) {
    return <p className="text-center text-red-600">Album not found.</p>;
  }
  const handleAlbumClick = (artistId) => {
    navigate(`/artists/${artistId}`);
  };
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded shadow">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">{album.name}</h1>
          <div className="mb-6 flex flex-col md:flex-row items-center gap-6">
            <img
              src={album?.cover || "default-album.jpg"}
              alt={album?.name || "Album"}
              className="w-64 h-64 object-cover rounded"
            />
            <div>
              <p className="font-semibold cursor-pointer text-lg hover:underline hover:text-gray-600"
               onClick={() => handleAlbumClick(album.artist_id)}>
                {(album.artist_id &&
                  artistsData.find((artist) => artist.id === album.artist_id)
                    ?.name) ||
                  "Unknown Artist"}
              </p>
              {album?.release_date && (
                <p className="text-sm">Released: {album.release_date}</p>
              )}
              <p className="italic">
                {album?.description || "No description available."}
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-3 border-b pb-2">Tracks</h2>
          <ul className="divide-y">
            {tracks.map((track, index) => (
              <li key={track.id || index} className="py-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    {index + 1}. {track.name}
                  </span>
                  <span>{convertDuration(track.duration)}</span>
                </div>
                {track.mp3 && (
                  <audio controls className="mt-2 w-full" src={track.mp3}>
                    Your browser does not support the audio element.
                  </audio>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Album;
