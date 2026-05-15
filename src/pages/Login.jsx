import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

import {
  ShieldCheck,
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await loginUser(
        form.email,
        form.password
      );

      localStorage.setItem(
        "token",
        data.access_token
      );

      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] flex items-center justify-center px-4 py-10 text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-cyan-500/30 blur-[140px] rounded-full animate-pulse"></div>

        <div className="absolute bottom-[-180px] right-[-100px] w-[450px] h-[450px] bg-fuchsia-500/25 blur-[160px] rounded-full animate-pulse"></div>

        <div className="absolute top-[40%] left-[40%] w-[260px] h-[260px] bg-indigo-500/20 blur-[120px] rounded-full"></div>

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]"></div>
      </div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">

        <div className="
          group
          relative
          overflow-hidden
          rounded-[36px]
          border border-white/10
          bg-white/10
          backdrop-blur-3xl
          p-8 md:p-10
          shadow-[0_20px_80px_rgba(0,0,0,0.45)]
          transition-all duration-500
          hover:scale-[1.01]
        ">

          {/* HOVER GLOW */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">

            <div className="absolute top-0 left-[-100%] h-full w-[40%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl animate-[shine_3s_linear_infinite]"></div>
          </div>

          {/* TOP ICON */}
          <div className="relative flex justify-center mb-8">

            <div className="relative">

              <div className="absolute inset-0 rounded-3xl bg-cyan-500 blur-xl opacity-40"></div>

              <div className="relative h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_10px_40px_rgba(34,211,238,0.45)]">

                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          {/* TITLE */}
          <div className="text-center mb-8">

            <div className="flex items-center justify-center gap-2 mb-3 text-cyan-200 text-sm">

              <Sparkles size={16} />
              Secure Enterprise Platform
            </div>

            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">

              Safety Platform
            </h1>

            <h2 className="text-xl mt-4 font-semibold text-white">
              Welcome Back 👋
            </h2>

            <p className="text-gray-400 mt-2">
              Login to access your intelligent
              safety dashboard
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="
              mb-6
              rounded-2xl
              border border-red-400/20
              bg-red-500/10
              backdrop-blur-xl
              px-4 py-4
              flex items-center gap-3
              text-red-300
              animate-[fadeIn_.4s_ease]
            ">

              <AlertTriangle size={18} />

              <span className="text-sm font-medium">
                {error}
              </span>
            </div>
          )}

          {/* EMAIL */}
          <div className="mb-5">

            <label className="text-sm text-cyan-200 font-medium mb-3 flex items-center gap-2">

              <Mail size={16} />
              Email Address
            </label>

            <div className="relative group/input">

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 opacity-0 group-hover/input:opacity-100 blur-xl transition duration-500"></div>

              <div className="relative flex items-center">

                <Mail
                  size={18}
                  className="absolute left-5 text-cyan-300"
                />

                <input
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/10
                    backdrop-blur-xl
                    py-4
                    pl-14
                    pr-5
                    outline-none
                    transition-all duration-300
                    focus:border-cyan-400/40
                    focus:bg-white/15
                    focus:shadow-[0_0_30px_rgba(34,211,238,0.2)]
                    placeholder:text-gray-400
                  "
                />
              </div>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-8">

            <label className="text-sm text-fuchsia-200 font-medium mb-3 flex items-center gap-2">

              <Lock size={16} />
              Password
            </label>

            <div className="relative group/input">

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 opacity-0 group-hover/input:opacity-100 blur-xl transition duration-500"></div>

              <div className="relative flex items-center">

                <Lock
                  size={18}
                  className="absolute left-5 text-fuchsia-300"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/10
                    backdrop-blur-xl
                    py-4
                    pl-14
                    pr-14
                    outline-none
                    transition-all duration-300
                    focus:border-fuchsia-400/40
                    focus:bg-white/15
                    focus:shadow-[0_0_30px_rgba(217,70,239,0.2)]
                    placeholder:text-gray-400
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    absolute
                    right-4
                    text-gray-300
                    hover:text-white
                    transition
                  "
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              group/button
              relative
              flex
              items-center
              justify-center
              gap-3
              w-full
              overflow-hidden
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-fuchsia-500
              py-4
              font-bold
              text-white
              shadow-[0_10px_40px_rgba(59,130,246,0.45)]
              transition-all duration-300
              hover:scale-[1.02]
              hover:shadow-[0_15px_60px_rgba(168,85,247,0.45)]
              active:scale-[0.98]
            "
          >

            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/button:opacity-100">

              <div className="absolute top-0 left-[-100%] h-full w-[35%] rotate-12 bg-white/30 blur-2xl animate-[shine_2s_linear_infinite]"></div>
            </div>

            <span className="relative z-10">
              {loading
                ? "Authenticating..."
                : "Login"}
            </span>

            {!loading && (
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover/button:translate-x-1" />
            )}
          </button>

          {/* DEMO */}
          <div className="
            mt-8
            rounded-2xl
            border border-white/10
            bg-black/20
            backdrop-blur-xl
            p-5
          ">

            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-4 font-semibold">

              Demo Credentials
            </p>

            <div className="space-y-3 text-sm">

              <div className="flex items-start justify-between gap-4 rounded-xl bg-white/5 p-3 border border-white/5">

                <div>
                  <p className="font-semibold text-white">
                    Admin
                  </p>

                  <p className="text-gray-400">
                    saqeeb@example.com
                  </p>
                </div>

                <span className="text-cyan-300 font-mono">
                  123456
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 rounded-xl bg-white/5 p-3 border border-white/5">

                <div>
                  <p className="font-semibold text-white">
                    User
                  </p>

                  <p className="text-gray-400">
                    user@exaple.com
                  </p>
                </div>

                <span className="text-fuchsia-300 font-mono">
                  123456
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOM ANIMATIONS */}
      <style>{`
        @keyframes shine {
          100% {
            left: 200%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
