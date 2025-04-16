import { Link } from "react-router-dom"
import ChickenIcon from "../assets/ChickenIcon.png"

export function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/home">
            <img src={ChickenIcon} alt="Logo" className="w-24 h-auto" />
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Link to="/albums" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">Albums</Link>
          <Link to="/artists" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">Artists</Link>
          <Link to="/genres" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">Genres</Link>
          <Link to="/search" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">Search</Link>
          <Link to="/profil" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">Profil</Link>
        </div>
      </div>
    </nav>
  )
}
export default Navbar