import { useEffect, useState } from "react";
import {
  getStats,
  getDashboard,
  downloadCSV,
} from "../services/api";

import { downloadPDF } from "../utils/pdf";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

import {
  Sparkles,
  RefreshCcw,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  ShieldCheck,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Database,
  ArrowUpRight,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [assigneeData, setAssigneeData] = useState([]);
  const [trendData, setTrendData] = useState([]);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
  });

  const [loading, setLoading] = useState(true);

  const COLORS = [
    "#22d3ee",
    "#a855f7",
    "#38bdf8",
    "#14b8a6",
    "#f472b6",
    "#8b5cf6",
  ];

  const fetchData = async () => {
    setLoading(true);

    try {
      const statsRes = await getStats();
      const dashRes = await getDashboard(filters);

      setStats([
        {
          title: "Open",
          value: statsRes.OPEN || 0,
          icon: AlertTriangle,
          color: "from-cyan-500 to-blue-500",
        },
        {
          title: "Assigned",
          value: statsRes.ASSIGNED || 0,
          icon: Activity,
          color: "from-fuchsia-500 to-purple-500",
        },
        {
          title: "In Progress",
          value: statsRes.IN_PROGRESS || 0,
          icon: TrendingUp,
          color: "from-amber-400 to-orange-500",
        },
        {
          title: "Resolved",
          value: statsRes.RESOLVED || 0,
          icon: CheckCircle2,
          color: "from-emerald-400 to-green-500",
        },
        {
          title: "Closed",
          value: statsRes.CLOSED || 0,
          icon: ShieldCheck,
          color: "from-indigo-500 to-violet-500",
        },
        {
          title: "Total",
          value: dashRes.total || 0,
          icon: Database,
          color: "from-pink-500 to-rose-500",
        },
      ]);

      setLocationData(
        dashRes.byLocation.map((l) => ({
          name: l.location || "Unknown",
          value: Number(l.count),
        }))
      );

      setAssigneeData(
        dashRes.byAssignee.map((a) => ({
          name: a.user || "Unassigned",
          value: Number(a.count),
        }))
      );

      setTrendData([
        { day: "Mon", issues: 4 },
        { day: "Tue", issues: 7 },
        { day: "Wed", issues: 3 },
        { day: "Thu", issues: 6 },
        { day: "Fri", issues: 9 },
        { day: "Sat", issues: 5 },
        { day: "Sun", issues: 8 },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/30 blur-[140px] rounded-full animate-pulse"></div>

        <div className="absolute bottom-[-200px] right-[-100px] w-[450px] h-[450px] bg-fuchsia-500/30 blur-[160px] rounded-full animate-pulse"></div>

        <div className="absolute top-[35%] left-[40%] w-[280px] h-[280px] bg-indigo-500/20 blur-[130px] rounded-full"></div>

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]"></div>
      </div>

      <div className="relative z-10 px-4 md:px-8 pt-24 pb-14 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-12">

          <div>

            <div className="flex items-center gap-4 mb-5">

              <div className="relative">

                <div className="absolute inset-0 rounded-3xl bg-cyan-500 blur-xl opacity-40"></div>

                <div className="relative h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_10px_40px_rgba(34,211,238,0.4)]">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                  Dashboard
                </h1>

                <div className="flex items-center gap-2 mt-2 text-cyan-200 text-sm">
                  <ArrowUpRight size={16} />
                  Premium Crystal Analytics
                </div>
              </div>
            </div>

            
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-4">

            <input
              type="date"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  fromDate: e.target.value,
                })
              }
              className="
                px-5 py-4 rounded-2xl
                bg-white/10
                border border-white/10
                backdrop-blur-2xl
                outline-none
                focus:border-cyan-400/40
                transition
                shadow-[0_10px_40px_rgba(0,0,0,0.35)]
              "
            />

            <input
              type="date"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  toDate: e.target.value,
                })
              }
              className="
                px-5 py-4 rounded-2xl
                bg-white/10
                border border-white/10
                backdrop-blur-2xl
                outline-none
                focus:border-fuchsia-400/40
                transition
                shadow-[0_10px_40px_rgba(0,0,0,0.35)]
              "
            />

            <button
              onClick={fetchData}
              className="
                flex items-center gap-2
                px-5 py-4 rounded-2xl
                bg-white/10
                hover:bg-white/20
                border border-white/10
                backdrop-blur-2xl
                transition-all duration-300
                hover:scale-105
              "
            >
              <RefreshCcw size={18} />
              Refresh
            </button>

            <button
              onClick={() => downloadCSV(filters)}
              className="
                flex items-center gap-2
                px-5 py-4 rounded-2xl
                bg-emerald-500/15
                hover:bg-emerald-500/25
                text-emerald-300
                border border-emerald-400/20
                transition-all duration-300
                hover:scale-105
              "
            >
              <FileSpreadsheet size={18} />
              CSV
            </button>

            <button
              onClick={downloadPDF}
              className="
                flex items-center gap-2
                px-5 py-4 rounded-2xl
                bg-fuchsia-500/15
                hover:bg-fuchsia-500/25
                text-fuchsia-300
                border border-fuchsia-400/20
                transition-all duration-300
                hover:scale-105
              "
            >
              <FileText size={18} />
              PDF
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">

            <div className="relative mb-6">

              <div className="w-20 h-20 border-[3px] border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>

              <div className="absolute inset-3 border-[3px] border-fuchsia-500/20 border-t-fuchsia-400 rounded-full animate-spin"></div>
            </div>

            <p className="text-gray-400 text-lg animate-pulse">
              Loading Dashboard Intelligence...
            </p>
          </div>
        ) : (
          <>
            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6 mb-12">

              {stats.map((s, i) => {
                const Icon = s.icon;

                return (
                  <div
                    key={i}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-[30px]
                      border border-white/10
                      bg-white/10
                      backdrop-blur-3xl
                      p-6
                      transition-all duration-500
                      hover:scale-[1.04]
                      hover:border-cyan-400/20
                      shadow-[0_10px_50px_rgba(0,0,0,0.35)]
                    "
                  >

                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${s.color} opacity-10 blur-3xl rounded-full`}></div>

                    <div className="flex items-center justify-between mb-7">

                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${s.color} shadow-lg`}>
                        <Icon className="text-white" />
                      </div>

                      <div className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-cyan-300">
                        Live
                      </div>
                    </div>

                    <h2 className="text-5xl font-black mb-2">
                      {s.value}
                    </h2>

                    <p className="text-gray-400">
                      {s.title}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* TREND CHART */}
            <div className="
              relative overflow-hidden
              rounded-[35px]
              border border-white/10
              bg-white/10
              backdrop-blur-3xl
              p-8
              mb-12
              shadow-[0_20px_80px_rgba(0,0,0,0.4)]
            ">

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5"></div>

              <div className="relative">

                <div className="flex items-center justify-between mb-8">

                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Weekly Issue Trend
                    </h2>

                    <p className="text-gray-400">
                      Real-time issue analytics overview
                    </p>
                  </div>

                  <div className="hidden md:flex items-center gap-2 text-sm text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping"></div>
                    Live Analytics
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={trendData}>

                    <defs>
                      <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.06)"
                    />

                    <XAxis
                      dataKey="day"
                      stroke="#94a3b8"
                    />

                    <YAxis stroke="#94a3b8" />

                    <Tooltip
                      contentStyle={{
                        background: "rgba(15,23,42,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "18px",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="issues"
                      stroke="#22d3ee"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorIssues)"
                    />

                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              {/* LOCATION */}
              <div className="
                rounded-[35px]
                border border-white/10
                bg-white/10
                backdrop-blur-3xl
                p-8
                shadow-[0_20px_80px_rgba(0,0,0,0.4)]
              ">

                <h2 className="text-3xl font-bold mb-2">
                  Issues by Location
                </h2>

                <p className="text-gray-400 mb-8">
                  Area-wise issue distribution
                </p>

                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={locationData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                    />

                    <XAxis
                      dataKey="name"
                      stroke="#94a3b8"
                    />

                    <YAxis stroke="#94a3b8" />

                    <Tooltip
                      contentStyle={{
                        background: "rgba(15,23,42,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "18px",
                      }}
                    />

                    <Bar
                      dataKey="value"
                      radius={[18, 18, 0, 0]}
                    >
                      {locationData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Bar>

                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* ASSIGNEE */}
              <div className="
                rounded-[35px]
                border border-white/10
                bg-white/10
                backdrop-blur-3xl
                p-8
                shadow-[0_20px_80px_rgba(0,0,0,0.4)]
              ">

                <h2 className="text-3xl font-bold mb-2">
                  Issues by Assignee
                </h2>

                <p className="text-gray-400 mb-8">
                  Task ownership breakdown
                </p>

                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>

                    <Pie
                      data={assigneeData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={120}
                      innerRadius={70}
                      paddingAngle={5}
                      label
                    >
                      {assigneeData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background: "rgba(15,23,42,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "18px",
                      }}
                    />

                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
