import { useEffect, useMemo, useState } from "react";
import { getLogs } from "../services/api";
import {
  Search,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Clock3,
  Sparkles,
  Radar,
  ShieldAlert,
  ArrowUpRight,
  DatabaseZap,
} from "lucide-react";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchLogs = async () => {
    setLoading(true);

    try {
      const data = await getLogs();
      setLogs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) =>
      (log.action || "")
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
  }, [logs, filter]);

  const totalLogs = logs.length;

  const loginLogs = logs.filter((l) =>
    (l.action || "").includes("LOGIN")
  ).length;

  const issueLogs = logs.filter((l) =>
    (l.action || "").includes("ISSUE")
  ).length;

  const deleteLogs = logs.filter((l) =>
    (l.action || "").includes("DELETE")
  ).length;

  const getBadgeStyle = (action) => {
    if (!action)
      return "bg-gray-500/20 text-gray-200 border border-gray-400/20";

    if (action.includes("LOGIN")) {
      return "bg-emerald-500/20 text-emerald-300 border border-emerald-400/20";
    }

    if (action.includes("DELETE")) {
      return "bg-red-500/20 text-red-300 border border-red-400/20";
    }

    if (action.includes("STATUS")) {
      return "bg-yellow-500/20 text-yellow-300 border border-yellow-400/20";
    }

    if (action.includes("ISSUE")) {
      return "bg-cyan-500/20 text-cyan-300 border border-cyan-400/20";
    }

    return "bg-indigo-500/20 text-indigo-300 border border-indigo-400/20";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/30 blur-[140px] rounded-full animate-pulse"></div>

        <div className="absolute bottom-[-200px] right-[-100px] w-[450px] h-[450px] bg-fuchsia-500/25 blur-[160px] rounded-full animate-pulse"></div>

        <div className="absolute top-[35%] left-[45%] w-[280px] h-[280px] bg-indigo-500/20 blur-[130px] rounded-full"></div>

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />
      </div>

      <div className="relative z-10 px-4 md:px-8 pt-24 pb-14 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          <div className="max-w-2xl">

            <div className="flex items-center gap-4 mb-5">

              <div className="relative">

                <div className="absolute inset-0 rounded-3xl bg-cyan-500 blur-xl opacity-40"></div>

                <div className="relative h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_10px_40px_rgba(34,211,238,0.4)]">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                  Audit Logs
                </h1>

                <div className="flex items-center gap-2 mt-2 text-cyan-200 text-sm">
                  <Sparkles size={16} />
                  AI Powered Security Monitoring
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed">
              Real-time monitoring dashboard with premium
              glassmorphism, advanced analytics, futuristic
              animations, and ultra responsive cyber UI.
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full xl:w-[420px] group">

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative flex items-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]">

              <Search
                size={20}
                className="absolute left-5 text-cyan-300"
              />

              <input
                placeholder="Search logs, activities, actions..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  pl-14
                  pr-5
                  py-5
                  outline-none
                  text-white
                  placeholder:text-gray-400
                "
              />

              <div className="pr-4">
                <Radar className="text-fuchsia-300 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

          {/* CARD */}
          <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-3xl p-7 transition-all duration-500 hover:scale-[1.03] hover:border-cyan-400/20 shadow-[0_10px_50px_rgba(0,0,0,0.35)]">

            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full"></div>

            <div className="flex items-center justify-between mb-7">

              <div className="p-4 rounded-2xl bg-cyan-500/15 border border-cyan-400/20">
                <DatabaseZap className="text-cyan-300" />
              </div>

              <div className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">
                <ArrowUpRight size={13} />
                Live
              </div>
            </div>

            <h2 className="text-5xl font-black mb-2">
              {totalLogs}
            </h2>

            <p className="text-gray-400">
              Total System Logs
            </p>
          </div>

          {/* CARD */}
          <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-3xl p-7 transition-all duration-500 hover:scale-[1.03] hover:border-emerald-400/20 shadow-[0_10px_50px_rgba(0,0,0,0.35)]">

            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full"></div>

            <div className="flex items-center justify-between mb-7">

              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/20">
                <Activity className="text-emerald-300" />
              </div>

              <div className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                Protected
              </div>
            </div>

            <h2 className="text-5xl font-black mb-2">
              {loginLogs}
            </h2>

            <p className="text-gray-400">
              Login Activities
            </p>
          </div>

          {/* CARD */}
          <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-3xl p-7 transition-all duration-500 hover:scale-[1.03] hover:border-yellow-400/20 shadow-[0_10px_50px_rgba(0,0,0,0.35)]">

            <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 blur-3xl rounded-full"></div>

            <div className="flex items-center justify-between mb-7">

              <div className="p-4 rounded-2xl bg-yellow-500/15 border border-yellow-400/20">
                <AlertTriangle className="text-yellow-300" />
              </div>

              <div className="text-xs px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-400/20">
                Tracking
              </div>
            </div>

            <h2 className="text-5xl font-black mb-2">
              {issueLogs}
            </h2>

            <p className="text-gray-400">
              Issue Activities
            </p>
          </div>

          {/* CARD */}
          <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-3xl p-7 transition-all duration-500 hover:scale-[1.03] hover:border-red-400/20 shadow-[0_10px_50px_rgba(0,0,0,0.35)]">

            <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 blur-3xl rounded-full"></div>

            <div className="flex items-center justify-between mb-7">

              <div className="p-4 rounded-2xl bg-red-500/15 border border-red-400/20">
                <ShieldAlert className="text-red-300" />
              </div>

              <div className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-300 border border-red-400/20">
                Sensitive
              </div>
            </div>

            <h2 className="text-5xl font-black mb-2">
              {deleteLogs}
            </h2>

            <p className="text-gray-400">
              Delete Activities
            </p>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="relative overflow-hidden rounded-[35px] border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

          {/* TOP */}
          <div className="relative border-b border-white/10 px-8 py-7">

            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5"></div>

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h2 className="text-3xl font-bold mb-2">
                  System Activity Feed
                </h2>

                <p className="text-gray-400">
                  Real-time platform audit and security trail
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 px-4 py-2 rounded-full w-fit">
                <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping"></div>
                Live Monitoring Enabled
              </div>
            </div>
          </div>

          {/* CONTENT */}
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center">

              <div className="relative mb-6">

                <div className="w-20 h-20 border-[3px] border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>

                <div className="absolute inset-3 border-[3px] border-fuchsia-500/20 border-t-fuchsia-400 rounded-full animate-spin"></div>
              </div>

              <p className="text-gray-400 text-lg animate-pulse">
                Loading audit intelligence...
              </p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-20 text-center">

              <div className="mx-auto mb-5 h-24 w-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Search className="w-10 h-10 text-gray-500" />
              </div>

              <h3 className="text-2xl font-bold mb-2">
                No Logs Found
              </h3>

              <p className="text-gray-400">
                Try searching with another keyword
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">

              {filteredLogs.map((log, i) => (
                <div
                  key={i}
                  className="
                    group
                    relative
                    px-6 md:px-8
                    py-6
                    hover:bg-white/[0.04]
                    transition-all
                    duration-500
                  "
                >

                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-400 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition duration-500 rounded-r-full"></div>

                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                    {/* LEFT */}
                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3 mb-4">

                        <div className="flex items-center gap-3">

                          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center font-bold text-cyan-200">
                            {log.email?.charAt(0)?.toUpperCase()}
                          </div>

                          <div>
                            <h3 className="font-semibold text-lg text-white">
                              {log.email}
                            </h3>

                            <p className="text-sm text-gray-400">
                              System User
                            </p>
                          </div>
                        </div>

                        <span
                          className={`
                            px-4 py-2 rounded-full text-xs font-semibold tracking-wide backdrop-blur-xl
                            ${getBadgeStyle(log.action)}
                          `}
                        >
                          {log.action}
                        </span>
                      </div>

                      <div className="rounded-2xl border border-white/5 bg-black/20 backdrop-blur-xl p-4 overflow-auto">

                        <pre className="text-sm text-gray-300 whitespace-pre-wrap break-all font-mono">
                          {JSON.stringify(log.metadata, null, 2)}
                        </pre>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3 text-sm text-gray-400 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 w-fit backdrop-blur-xl">

                      <Clock3 size={18} className="text-cyan-300" />

                      <span>
                        {new Date(
                          log.createdAt
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CUSTOM ANIMATIONS */}
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
