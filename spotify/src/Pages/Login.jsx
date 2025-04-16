import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8001/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Stockage complet des informations utilisateur
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log("Données utilisateur stockées:", data.user);
        }
        
        navigate("/profil");
      } else {
        setError(data.message || "Identifiants incorrects, veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError("Erreur de connexion au serveur. Vérifiez que le serveur est bien démarré.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 ${loading ? 'bg-green-700' : 'bg-green-500'} text-white font-bold rounded-lg hover:bg-green-600 transition duration-300 flex justify-center items-center`}
          >
            {loading ? "Connexion en cours..." : "Login"}
          </button>
            <div className="mt-4 text-center">
            <p className="text-sm">
              Pas encore de compte ?{" "}
              <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-green-500 hover:underline"
              >
              Inscrivez-vous
              </button>
            </p>
            </div>
        </form>
      </div>
    </div>
  );
}
export default Login;