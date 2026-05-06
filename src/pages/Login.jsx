import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await loginUser(form.email, form.password);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">

        {/* 🔥 App Title */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Safety Platform 🛡️
        </h1>

        <h2 className="text-xl text-center mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-400 mb-6">
          Login to your account
        </p>

        {/* 🔥 Error Message */}
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/20 outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* PASSWORD + TOGGLE */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/20 outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm text-gray-300"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold hover:scale-[1.02] transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 🔥 Footer Hint */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Demo Credentials:
          <br />
          Admin → saqeeb@example.com / 123456
          User → user@exaple.com / 123456

        </p>

      </div>
    </div>
  );
}
