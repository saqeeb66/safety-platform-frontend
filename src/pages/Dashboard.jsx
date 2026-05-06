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

  const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];

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
        { title: "Total", value: dashRes.total || 0 }, // 🔥 NEW
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

      // 🔥 MOCK TREND DATA (can connect backend later)
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
    <div className="pt-24 px-6 max-w-7xl mx-auto text-white">

      {/* 🔥 HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">

        <h1 className="text-4xl font-bold">
          Dashboard 🚀
        </h1>

        <div className="flex gap-3 flex-wrap">

          {/* 🔥 DATE FILTER */}
          <input
            type="date"
            onChange={(e) =>
              setFilters({ ...filters, fromDate: e.target.value })
            }
            className="p-2 rounded bg-white/10 border border-white/20"
          />

          <input
            type="date"
            onChange={(e) =>
              setFilters({ ...filters, toDate: e.target.value })
            }
            className="p-2 rounded bg-white/10 border border-white/20"
          />

          <button
            onClick={fetchData}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
          >
            🔄 Refresh
          </button>

          <button
            onClick={() => downloadCSV(filters)}
            className="px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30"
          >
            📊 CSV
          </button>

          <button
            onClick={downloadPDF}
            className="px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30"
          >
            📄 PDF
          </button>

        </div>
      </div>

      {loading ? (
        <p className="animate-pulse text-gray-300">Loading dashboard...</p>
      ) : (
        <>
          {/* 🔥 STATS */}
          <div className="grid md:grid-cols-6 gap-4 mb-10">
            {stats.map((s, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-lg border border-white/10 shadow-lg hover:scale-[1.05]"
              >
                <p className="text-gray-300 text-sm">{s.title}</p>
                <h2 className="text-2xl font-bold mt-2">{s.value}</h2>
              </div>
            ))}
          </div>

          {/* 🔥 TREND CHART (NEW FEATURE) */}
          <div className="p-6 mb-10 rounded-2xl bg-white/10 border border-white/10">
            <h2 className="mb-4 font-semibold">Weekly Issue Trend 📈</h2>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <XAxis dataKey="day" stroke="#ccc" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="issues" stroke="#6366F1" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 🔥 CHARTS */}
          <div className="grid md:grid-cols-2 gap-10">

            {/* LOCATION */}
            <div className="p-6 rounded-2xl bg-white/10 border border-white/10">
              <h2 className="mb-4 font-semibold">Issues by Location 📍</h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationData}>
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {locationData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* ASSIGNEE */}
            <div className="p-6 rounded-2xl bg-white/10 border border-white/10">
              <h2 className="mb-4 font-semibold">Issues by Assignee 👤</h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assigneeData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {assigneeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
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
  );
}