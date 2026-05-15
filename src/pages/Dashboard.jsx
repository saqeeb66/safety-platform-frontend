import { useEffect, useState } from "react";
import { getStats, getDashboard, downloadCSV } from "../services/api";
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
} from "recharts";

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

  // 🌈 PEARL COLORS
  const COLORS = [
    "#c4b5fd",
    "#f9a8d4",
    "#93c5fd",
    "#a7f3d0",
    "#fde68a",
  ];

  const fetchData = async () => {
    setLoading(true);

    try {
      const statsRes = await getStats();
      const dashRes = await getDashboard(filters);

      setStats([
        { title: "Open", value: statsRes.OPEN || 0 },
        { title: "Assigned", value: statsRes.ASSIGNED || 0 },
        { title: "In Progress", value: statsRes.IN_PROGRESS || 0 },
        { title: "Resolved", value: statsRes.RESOLVED || 0 },
        { title: "Closed", value: statsRes.CLOSED || 0 },
        { title: "Total", value: dashRes.total || 0 },
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

      // 🔥 DEMO TREND
      setTrendData([
        { day: "Mon", issues: 4 },
        { day: "Tue", issues: 7 },
        { day: "Wed", issues: 3 },
        { day: "Thu", issues: 6 },
        { day: "Fri", issues: 9 },
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
    <div className="min-h-screen relative overflow-hidden bg-[#f7f4ff] text-[#1e1b4b]">

      {/* 🌈 PEARL BLOBS */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-200/40 blur-[120px] rounded-full" />

      <div className="absolute top-[20%] right-0 w-[450px] h-[450px] bg-purple-200/40 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 left-[30%] w-[500px] h-[500px] bg-cyan-100/40 blur-[120px] rounded-full" />

      <div className="relative z-10 pt-24 px-6 max-w-7xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">

          <div>
            <h1 className="text-5xl font-black tracking-tight">
              Dashboard ✨
            </h1>

            <p className="text-[#6b7280] mt-2">
              Crystal analytics overview of your safety platform
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 flex-wrap">

            <input
              type="date"
              onChange={(e) =>
                setFilters({ ...filters, fromDate: e.target.value })
              }
              className="p-3 rounded-2xl bg-white/70 border border-white/50 backdrop-blur-xl shadow-sm"
            />

            <input
              type="date"
              onChange={(e) =>
                setFilters({ ...filters, toDate: e.target.value })
              }
              className="p-3 rounded-2xl bg-white/70 border border-white/50 backdrop-blur-xl shadow-sm"
            />

            <button
              onClick={fetchData}
              className="px-5 py-3 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-white/40 transition-all duration-300 hover:scale-105 shadow-md"
            >
              🔄 Refresh
            </button>

            <button
              onClick={() => downloadCSV(filters)}
              className="px-5 py-3 rounded-2xl bg-emerald-100/80 hover:bg-emerald-200/80 text-emerald-700 border border-emerald-200 transition-all duration-300 hover:scale-105 shadow-md"
            >
              📊 CSV
            </button>

            <button
              onClick={downloadPDF}
              className="px-5 py-3 rounded-2xl bg-purple-100/80 hover:bg-purple-200/80 text-purple-700 border border-purple-200 transition-all duration-300 hover:scale-105 shadow-md"
            >
              📄 PDF
            </button>

          </div>
        </div>

        {loading ? (
          <p className="animate-pulse text-[#6b7280]">
            Loading dashboard...
          </p>
        ) : (
          <>

            {/* 🔥 STATS */}
            <div className="grid md:grid-cols-6 gap-5 mb-12">

              {stats.map((s, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-gradient-to-br from-pink-100/80 via-purple-100/70 to-cyan-100/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(255,255,255,0.35)] hover:scale-[1.04] transition-all duration-300"
                >
                  <p className="text-[#6b7280] text-sm font-medium">
                    {s.title}
                  </p>

                  <h2 className="text-4xl font-black mt-3">
                    {s.value}
                  </h2>
                </div>
              ))}

            </div>

            {/* 🔥 TREND CHART */}
            <div className="p-8 mb-10 rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(255,255,255,0.35)]">

              <h2 className="mb-6 text-2xl font-bold">
                Weekly Issue Trend 📈
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="issues"
                    stroke="#c084fc"
                    strokeWidth={4}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>

            {/* 🔥 CHARTS */}
            <div className="grid md:grid-cols-2 gap-10">

              {/* LOCATION */}
              <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(255,255,255,0.35)]">

                <h2 className="mb-6 text-2xl font-bold">
                  Issues by Location 📍
                </h2>

                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={locationData}>
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />

                    <Bar dataKey="value" radius={[20, 20, 0, 0]}>
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
              <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(255,255,255,0.35)]">

                <h2 className="mb-6 text-2xl font-bold">
                  Issues by Assignee 👤
                </h2>

                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>

                    <Pie
                      data={assigneeData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                      innerRadius={55}
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

                    <Tooltip />

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
