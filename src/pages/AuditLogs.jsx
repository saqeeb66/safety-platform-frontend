import { useEffect, useMemo, useState } from "react";
import { getLogs } from "../services/api";
import {
  Search,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Clock3,
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

  const getBadgeStyle = (action) => {
    if (!action)
      return "bg-gray-500/20 text-gray-200 border border-gray-400/20";

    if (action.includes("LOGIN")) {
      return "bg-green-500/20 text-green-300 border border-green-400/20";
    }

    if (action.includes("DELETE")) {
      return "bg-red-500/20 text-red-300 border border-red-400/20";
    }

    if (action.includes("STATUS")) {
      return "bg-yellow-500/20 text-yellow-300 border border-yellow-400/20";
    }

    return "bg-indigo-500/20 text-indigo-300 border border-indigo-400/20";
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0b1020] text-white">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 px-6 pt-24 pb-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Audit Logs 🔐
            </h1>

            <p className="text-gray-400 mt-2">
              Monitor system actions, security events, and user activities
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-[380px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              placeholder="Search actions..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="
                w-full
                pl-11
                pr-4
                py-3
                rounded-2xl
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                outline-none
                focus:border-indigo-400/40
                transition
                shadow-[0_8px_32px_rgba(0,0,0,0.25)]
              "
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* CARD 1 */}
          <div
            className="
              rounded-3xl
              bg-white/10
              backdrop-blur-2xl
              border border-white/10
              p-6
              shadow-[0_8px_32px_rgba(0,0,0,0.25)]
            "
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-indigo-500/20">
                <ShieldCheck className="text-indigo-300" />
              </div>

              <span className="text-xs text-green-300 bg-green-500/10 px-3 py-1 rounded-full">
                Active
              </span>
            </div>

            <h2 className="text-4xl font-bold">{totalLogs}</h2>

            <p className="text-gray-400 mt-2">
              Total Audit Logs
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className="
              rounded-3xl
              bg-white/10
              backdrop-blur-2xl
              border border-white/10
              p-6
              shadow-[0_8px_32px_rgba(0,0,0,0.25)]
            "
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-green-500/20">
                <Activity className="text-green-300" />
              </div>

              <span className="text-xs text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full">
                Secure
              </span>
            </div>

            <h2 className="text-4xl font-bold">{loginLogs}</h2>

            <p className="text-gray-400 mt-2">
              Login Activities
            </p>
          </div>

          {/* CARD 3 */}
          <div
            className="
              rounded-3xl
              bg-white/10
              backdrop-blur-2xl
              border border-white/10
              p-6
              shadow-[0_8px_32px_rgba(0,0,0,0.25)]
            "
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-yellow-500/20">
                <AlertTriangle className="text-yellow-300" />
              </div>

              <span className="text-xs text-pink-300 bg-pink-500/10 px-3 py-1 rounded-full">
                Tracking
              </span>
            </div>

            <h2 className="text-4xl font-bold">{issueLogs}</h2>

            <p className="text-gray-400 mt-2">
              Issue Activities
            </p>
          </div>
        </div>

        {/* LOGS SECTION */}
        <div
          className="
            rounded-[32px]
            bg-white/10
            backdrop-blur-2xl
            border border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.25)]
            overflow-hidden
          "
        >

          {/* TABLE HEADER */}
          <div className="px-8 py-6 border-b border-white/10">
            <h2 className="text-2xl font-semibold">
              System Activity
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Real-time audit trail of platform operations
            </p>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-400 animate-pulse">
              Loading audit logs...
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No logs found.
            </div>
          ) : (
            <div className="divide-y divide-white/5">

              {filteredLogs.map((log, i) => (
                <div
                  key={i}
                  className="
                    px-8
                    py-5
                    hover:bg-white/[0.03]
                    transition-all
                    duration-300
                  "
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    {/* LEFT */}
                    <div className="flex-1">

                      <div className="flex items-center gap-3 mb-3 flex-wrap">

                        <span className="font-semibold text-white">
                          {log.email}
                        </span>

                        <span
                          className={`
                            px-3 py-1 rounded-full text-xs font-medium
                            ${getBadgeStyle(log.action)}
                          `}
                        >
                          {log.action}
                        </span>
                      </div>

                      <div className="text-sm text-gray-300 break-all">
                        {JSON.stringify(log.metadata)}
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 whitespace-nowrap">

                      <Clock3 size={16} />

                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
