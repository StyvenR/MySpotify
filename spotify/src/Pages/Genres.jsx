import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function Genres() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresResponse = await fetch("http://localhost:8000/genres");
        if (!genresResponse.ok) {
          throw new Error(`HTTP error! status: ${genresResponse.status}`);
        }
        const genresData = await genresResponse.json();

        // Recherche des artistes par rapport aux albums
        // const genresWithTrackDetail = genresData.map(genre => {
        //   const track = tracksData.find(track => track.id === genre.track_id);
        //   return {
        //     ...genre,
        //     track_name: track ? track.name : "Unknown Track"
        //   };
        // });

        setGenres(genresData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    navigate(`/genres/${genreId}`);
  };
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Genres</h1>
      {loading ? (
        <p className="text-center">Loading artists...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            {genres.map((genre) => (
              <div
                key={genre.id}
                className="bg-green-500 hover:bg-green-600 transition-all duration-350 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
                onClick={() => handleGenreClick(genre.id)}
              >
                <div>{genre.name}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default Genres;
