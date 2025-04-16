import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Albums from "./Pages/Albums";
import Album from "./Pages/Album";
import Genres from "./Pages/Genres";
import Genre from "./Pages/Genre";
import Artists from "./Pages/Artists";
import Search from "./Pages/Search";
import Layout from "./Components/Layout";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Artist from "./Pages/Artist";
import Profil from "./Pages/Profil";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/search" element={<Search />} />
            <Route path="/albums/:albumId" element={<Album />} />
            <Route path="/artists/:artistId" element={<Artist />} />
            <Route path="/genres/:genreId" element={<Genre />} />
            <Route path="/profil" element={<Profil />} />
          </Route>


        </Routes>
      </Router>
    </>
  );
}

export default App;
