import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/"); // back to login
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/10">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white">

        {/* LEFT */}
        <h1 className="font-bold text-lg">
          Safety Platform
        </h1>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

            {role === "ADMIN" && (
            <button onClick={() => navigate("/audit")}>
            Audit
            </button>
            )}

          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          <button onClick={() => navigate("/issues")}>
            Issues
          </button>

          <button onClick={() => navigate("/create")}>
            Create
          </button>

          {/* 🔥 SHOW ROLE */}
          {role && (
            <span className="text-sm text-gray-300">
              {role}
            </span>
          )}

          {/* 🔥 LOGOUT BUTTON */}
          {token && (
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </div>
  );
}