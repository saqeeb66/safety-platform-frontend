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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
  try {
    setLoading(true);

    const data = await loginUser(form.email, form.password);

    console.log("LOGIN RESPONSE:", data); 

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("role", data.role); 

    navigate("/dashboard");

  } catch (err) {
    alert("Login failed ❌");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-400 mb-6">
          Login to your account
        </p>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/20 outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg bg-white/20 border border-white/20 outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold hover:scale-[1.02] transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}