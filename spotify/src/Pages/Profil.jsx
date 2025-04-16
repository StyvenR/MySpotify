import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Profil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les données utilisateur du localStorage
    const userData = localStorage.getItem("user");
    
    if (!userData) {
      // Rediriger vers la page de connexion si aucun utilisateur n'est trouvé
      navigate("/login");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur:", error);
      localStorage.removeItem("user");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Supprimer les données utilisateur du localStorage
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p>Chargement du profil...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Profil</h1>
        
        <div className="bg-gray-700 p-6 rounded-lg mb-6">
          
          <div className="mb-4">
            <p className="text-sm text-gray-400">Nom d'utilisateur:</p>
            <p className="text-lg font-semibold">{user.username}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-400">Email:</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
          
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleLogout}
            className="flex-1 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profil;