import { useEffect, useState } from "react";
import { getLogs } from "../services/api";

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

  const filteredLogs = logs.filter((log) =>
    log.action.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto text-white">

      <h1 className="text-3xl font-bold mb-6">
        Audit Logs 🔐
      </h1>

      {/* 🔥 FILTER */}
      <input
        placeholder="Search action (LOGIN, ISSUE...)"
        onChange={(e) => setFilter(e.target.value)}
        className="mb-6 p-3 w-full rounded-lg bg-white/10 border border-white/20"
      />

      {loading ? (
        <p className="animate-pulse">Loading logs...</p>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full border border-white/10 rounded-lg overflow-hidden">

            <thead className="bg-white/10">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Action</th>
                <th className="p-3 text-left">Metadata</th>
                <th className="p-3 text-left">Time</th>
              </tr>
            </thead>

            <tbody>
              {filteredLogs.map((log, i) => (
                <tr
                  key={i}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="p-3">{log.email}</td>

                  <td className="p-3 font-semibold text-indigo-300">
                    {log.action}
                  </td>

                  <td className="p-3 text-sm text-gray-400">
                    {JSON.stringify(log.metadata)}
                  </td>

                  <td className="p-3 text-sm text-gray-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}