import { useEffect, useState } from "react";
import {
  getIssues,
  updateIssueStatus,
  assignIssue,
  deleteIssue,
} from "../services/api";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  Sparkles,
  User,
  MapPin,
  ShieldCheck,
  Trash2,
  PlayCircle,
  CheckCheck,
  BadgeCheck,
  XCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function Issues() {
  const role = localStorage.getItem("role");
  const userEmail = localStorage.getItem("email");

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    status: "",
    page: 1,
    limit: 5,
  });

  const [total, setTotal] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const allowedTransitions = {
    OPEN: ["ASSIGNED"],
    ASSIGNED: ["IN_PROGRESS"],
    IN_PROGRESS: ["RESOLVED"],
    RESOLVED: ["APPROVED"],
    APPROVED: ["CLOSED"],
  };

  const fetchIssues = async () => {
    setLoading(true);

    try {
      const res = await getIssues(filters);
      setIssues(res.data || []);
      setTotal(res.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [filters]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateIssueStatus(id, status);
      fetchIssues();
    } catch {
      alert("Not allowed ❌");
    }
  };

  const handleAssign = async (id) => {
    const email = prompt("Enter user email:");

    if (!email) return;

    try {
      await assignIssue(id, email);
      fetchIssues();
    } catch {
      alert("Assign failed ❌");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmDelete) return;

    try {
      await deleteIssue(id);
      fetchIssues();

      alert("Issue deleted successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  const canTransition = (current, next) => {
    return allowedTransitions[current]?.includes(next);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-red-500/15 text-red-300 border border-red-400/20";

      case "ASSIGNED":
        return "bg-cyan-500/15 text-cyan-300 border border-cyan-400/20";

      case "IN_PROGRESS":
        return "bg-yellow-500/15 text-yellow-300 border border-yellow-400/20";

      case "RESOLVED":
        return "bg-purple-500/15 text-purple-300 border border-purple-400/20";

      case "APPROVED":
        return "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20";

      case "CLOSED":
        return "bg-gray-500/15 text-gray-300 border border-gray-400/20";

      default:
        return "bg-white/10 text-white border border-white/10";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-150px] left-[-100px] w-[420px] h-[420px] bg-cyan-500/30 blur-[140px] rounded-full animate-pulse"></div>

        <div className="absolute bottom-[-200px] right-[-120px] w-[450px] h-[450px] bg-fuchsia-500/25 blur-[160px] rounded-full animate-pulse"></div>

        <div className="absolute top-[40%] left-[45%] w-[260px] h-[260px] bg-indigo-500/20 blur-[120px] rounded-full"></div>

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
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                  Issues
                </h1>

                <div className="flex items-center gap-2 mt-2 text-cyan-200 text-sm">
                  <Sparkles size={16} />
                  Smart Issue Monitoring System
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-lg max-w-2xl">
              Premium issue tracking dashboard with crystal
              glassmorphism UI, futuristic animations,
              responsive cards, and enterprise workflow
              experience.
            </p>
          </div>

          {/* FILTER */}
          <div className="relative group">

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative flex items-center gap-3 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">

              <Filter className="text-cyan-300" />

              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status: e.target.value,
                    page: 1,
                  })
                }
                className="bg-transparent outline-none text-white"
              >
                <option className="bg-[#0f172a]" value="">
                  All Status
                </option>

                <option className="bg-[#0f172a]" value="OPEN">
                  OPEN
                </option>

                <option className="bg-[#0f172a]" value="ASSIGNED">
                  ASSIGNED
                </option>

                <option className="bg-[#0f172a]" value="IN_PROGRESS">
                  IN PROGRESS
                </option>

                <option className="bg-[#0f172a]" value="RESOLVED">
                  RESOLVED
                </option>

                <option className="bg-[#0f172a]" value="APPROVED">
                  APPROVED
                </option>

                <option className="bg-[#0f172a]" value="CLOSED">
                  CLOSED
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">

            <div className="relative mb-6">

              <div className="w-20 h-20 border-[3px] border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>

              <div className="absolute inset-3 border-[3px] border-fuchsia-500/20 border-t-fuchsia-400 rounded-full animate-spin"></div>
            </div>

            <p className="text-gray-400 text-lg animate-pulse">
              Loading Issues...
            </p>
          </div>
        ) : (
          <>
            {/* ISSUES */}
            <div className="grid gap-8">

              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[35px]
                    border border-white/10
                    bg-white/10
                    backdrop-blur-3xl
                    p-7
                    transition-all duration-500
                    hover:scale-[1.01]
                    hover:border-cyan-400/20
                    shadow-[0_20px_80px_rgba(0,0,0,0.4)]
                  "
                >

                  {/* GLOW */}
                  <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full"></div>

                  {/* TOP */}
                  <div className="relative flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-6">

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-4 mb-4">

                        <div className="h-14 w-14 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center">
                          <AlertTriangle className="text-cyan-300" />
                        </div>

                        <div>

                          <h2 className="text-2xl font-bold text-white">
                            {issue.description}
                          </h2>

                          <p className="text-sm text-gray-400 mt-1">
                            Issue ID #{issue.id}
                          </p>
                        </div>

                        <span
                          className={`
                            px-4 py-2 rounded-full text-xs font-semibold tracking-wide backdrop-blur-xl
                            ${getStatusStyles(issue.status)}
                          `}
                        >
                          {issue.status}
                        </span>
                      </div>

                      {/* DETAILS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="rounded-2xl border border-white/5 bg-black/20 p-4 backdrop-blur-xl">

                          <div className="flex items-center gap-2 mb-2 text-cyan-300">
                            <ShieldCheck size={16} />
                            <span className="text-sm font-semibold">
                              Reference Standard
                            </span>
                          </div>

                          <p className="text-gray-300 text-sm">
                            {issue.referenceStandard || "N/A"}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/5 bg-black/20 p-4 backdrop-blur-xl">

                          <div className="flex items-center gap-2 mb-2 text-fuchsia-300">
                            <CheckCircle2 size={16} />
                            <span className="text-sm font-semibold">
                              Action Plan
                            </span>
                          </div>

                          <p className="text-gray-300 text-sm">
                            {issue.actionPlan || "N/A"}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/5 bg-black/20 p-4 backdrop-blur-xl">

                          <div className="flex items-center gap-2 mb-2 text-yellow-300">
                            <MapPin size={16} />
                            <span className="text-sm font-semibold">
                              Location
                            </span>
                          </div>

                          <p className="text-gray-300 text-sm">
                            {issue.location?.name || "Unknown"}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/5 bg-black/20 p-4 backdrop-blur-xl">

                          <div className="flex items-center gap-2 mb-2 text-emerald-300">
                            <User size={16} />
                            <span className="text-sm font-semibold">
                              Assigned User
                            </span>
                          </div>

                          <p className="text-gray-300 text-sm">
                            {issue.assignedUser || "None"}
                          </p>
                        </div>
                      </div>

                      {/* FOOTER */}
                      <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-gray-400">

                        <div className="flex items-center gap-2">
                          <User size={15} />
                          {issue.createdBy}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 size={15} />
                          {new Date(
                            issue.createdAt
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-3">

                    {issue.image && (
                      <button
                        onClick={() =>
                          setSelectedImage(issue.image)
                        }
                        className="
                          flex items-center gap-2
                          px-5 py-3 rounded-2xl
                          bg-cyan-500/15
                          hover:bg-cyan-500/25
                          text-cyan-300
                          border border-cyan-400/20
                          transition-all duration-300
                          hover:scale-105
                        "
                      >
                        <Eye size={18} />
                        View Image
                      </button>
                    )}

                    {role === "ADMIN" &&
                      issue.status === "OPEN" && (
                        <button
                          onClick={() =>
                            handleAssign(issue.id)
                          }
                          className="
                            flex items-center gap-2
                            px-5 py-3 rounded-2xl
                            bg-blue-500/15
                            hover:bg-blue-500/25
                            text-blue-300
                            border border-blue-400/20
                            transition-all duration-300
                            hover:scale-105
                          "
                        >
                          <User size={18} />
                          Assign
                        </button>
                      )}

                    {role === "ADMIN" && (
                      <button
                        onClick={() =>
                          handleDelete(issue.id)
                        }
                        className="
                          flex items-center gap-2
                          px-5 py-3 rounded-2xl
                          bg-red-500/15
                          hover:bg-red-500/25
                          text-red-300
                          border border-red-400/20
                          transition-all duration-300
                          hover:scale-105
                        "
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    )}

                    {role === "ADMIN" &&
                      canTransition(
                        issue.status,
                        "APPROVED"
                      ) && (
                        <button
                          onClick={() =>
                            handleStatusChange(
                              issue.id,
                              "APPROVED"
                            )
                          }
                          className="
                            flex items-center gap-2
                            px-5 py-3 rounded-2xl
                            bg-emerald-500/15
                            hover:bg-emerald-500/25
                            text-emerald-300
                            border border-emerald-400/20
                            transition-all duration-300
                            hover:scale-105
                          "
                        >
                          <BadgeCheck size={18} />
                          Approve
                        </button>
                      )}

                    {role === "ADMIN" &&
                      canTransition(
                        issue.status,
                        "CLOSED"
                      ) && (
                        <button
                          onClick={() =>
                            handleStatusChange(
                              issue.id,
                              "CLOSED"
                            )
                          }
                          className="
                            flex items-center gap-2
                            px-5 py-3 rounded-2xl
                            bg-gray-500/15
                            hover:bg-gray-500/25
                            text-gray-300
                            border border-gray-400/20
                            transition-all duration-300
                            hover:scale-105
                          "
                        >
                          <XCircle size={18} />
                          Close
                        </button>
                      )}

                    {role === "USER" &&
                      issue.assignedUser ===
                        userEmail &&
                      canTransition(
                        issue.status,
                        "IN_PROGRESS"
                      ) && (
                        <button
                          onClick={() =>
                            handleStatusChange(
                              issue.id,
                              "IN_PROGRESS"
                            )
                          }
                          className="
                            flex items-center gap-2
                            px-5 py-3 rounded-2xl
                            bg-yellow-500/15
                            hover:bg-yellow-500/25
                            text-yellow-300
                            border border-yellow-400/20
                            transition-all duration-300
                            hover:scale-105
                          "
                        >
                          <PlayCircle size={18} />
                          Start
                        </button>
                      )}

                    {role === "USER" &&
                      issue.assignedUser ===
                        userEmail &&
                      canTransition(
                        issue.status,
                        "RESOLVED"
                      ) && (
                        <button
                          onClick={() =>
                            handleStatusChange(
                              issue.id,
                              "RESOLVED"
                            )
                          }
                          className="
                            flex items-center gap-2
                            px-5 py-3 rounded-2xl
                            bg-purple-500/15
                            hover:bg-purple-500/25
                            text-purple-300
                            border border-purple-400/20
                            transition-all duration-300
                            hover:scale-105
                          "
                        >
                          <CheckCheck size={18} />
                          Resolve
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">

              <button
                disabled={filters.page === 1}
                onClick={() =>
                  setFilters({
                    ...filters,
                    page: filters.page - 1,
                  })
                }
                className="
                  flex items-center gap-2
                  px-5 py-3 rounded-2xl
                  bg-white/10
                  border border-white/10
                  backdrop-blur-xl
                  hover:bg-white/20
                  transition-all duration-300
                  disabled:opacity-40
                "
              >
                <ArrowLeft size={18} />
                Previous
              </button>

              <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl">
                Page{" "}
                <span className="font-bold text-cyan-300">
                  {filters.page}
                </span>
              </div>

              <button
                disabled={
                  filters.page * filters.limit >= total
                }
                onClick={() =>
                  setFilters({
                    ...filters,
                    page: filters.page + 1,
                  })
                }
                className="
                  flex items-center gap-2
                  px-5 py-3 rounded-2xl
                  bg-white/10
                  border border-white/10
                  backdrop-blur-xl
                  hover:bg-white/20
                  transition-all duration-300
                  disabled:opacity-40
                "
              >
                Next
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">

          <div className="relative max-w-5xl w-full animate-[fadeIn_.3s_ease]">

            <button
              onClick={() => setSelectedImage(null)}
              className="
                absolute -top-14 right-0
                px-4 py-2 rounded-xl
                bg-white/10
                border border-white/10
                hover:bg-white/20
                transition
              "
            >
              ✖ Close
            </button>

            <div className="overflow-hidden rounded-[35px] border border-white/10 bg-white/10 backdrop-blur-3xl p-4 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">

              <img
                src={selectedImage}
                className="
                  w-full
                  max-h-[80vh]
                  object-contain
                  rounded-[28px]
                "
              />
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM SCROLLBAR */}
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 999px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
