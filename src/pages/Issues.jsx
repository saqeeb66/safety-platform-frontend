import { useEffect, useState } from "react";
import {
getIssues,
updateIssueStatus,
assignIssue,
deleteIssue,
} from "../services/api";

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

const canTransition = (current, next) => {
return allowedTransitions[current]?.includes(next);
};

const getStatusColor = (status) => {
switch (status) {
case "OPEN":
return "bg-red-500/20 text-red-400";
case "ASSIGNED":
return "bg-blue-500/20 text-blue-400";
case "IN_PROGRESS":
return "bg-yellow-500/20 text-yellow-400";
case "RESOLVED":
return "bg-purple-500/20 text-purple-400";
case "APPROVED":
return "bg-green-500/20 text-green-400";
case "CLOSED":
return "bg-gray-500/20 text-gray-400";
default:
return "bg-gray-500/20 text-gray-400";
}
};

return ( <div className="pt-24 px-6 max-w-6xl mx-auto text-white">

```
  <h1 className="text-3xl font-bold mb-6">Issues 📋</h1>

  {/* FILTER */}
  <div className="flex gap-4 mb-6">
    <select
      value={filters.status}
      onChange={(e) =>
        setFilters({ ...filters, status: e.target.value, page: 1 })
      }
      className="p-2 rounded bg-white/10 border border-white/20"
    >
      <option value="">All Status</option>
      <option value="OPEN">OPEN</option>
      <option value="ASSIGNED">ASSIGNED</option>
      <option value="IN_PROGRESS">IN_PROGRESS</option>
      <option value="RESOLVED">RESOLVED</option>
      <option value="APPROVED">APPROVED</option>
      <option value="CLOSED">CLOSED</option>
    </select>
  </div>

  {loading ? (
    <p className="animate-pulse">Loading...</p>
  ) : (
    <div className="grid gap-5">

      {issues.map((issue) => (
        <div
          key={issue.id}
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">
              {issue.description}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-sm ${getStatusColor(issue.status)}`}
            >
              {issue.status}
            </span>
          </div>

          <div className="space-y-1 text-sm text-gray-300">

            <p>
              <strong>📌 Reference:</strong>{" "}
              {issue.referenceStandard || "N/A"}
            </p>

            <p>
              <strong>🛠 Action Plan:</strong>{" "}
              {issue.actionPlan || "N/A"}
            </p>

            <p>
              <strong>📍 Location:</strong>{" "}
              {issue.location?.name || "Unknown"}
            </p>

            <p>
              <strong>👤 Assigned:</strong>{" "}
              {issue.assignedUser || "None"}
            </p>

            <p>
              <strong>🧑 Created by:</strong>{" "}
              {issue.createdBy}
            </p>

            <p>
              <strong>🕒 Created At:</strong>{" "}
              {new Date(issue.createdAt).toLocaleString()}
            </p>
          </div>

          {issue.image && (
            <button
            onClick={() =>
            setSelectedImage(
            `${import.meta.env.VITE_API_URL}${issue.image}`
            )
            }
            className="px-3 py-1 mt-3 bg-indigo-500/20 rounded hover:bg-indigo-500/40 transition"
            >
            View Image 👁️
            </button>
            )}
          <div className="flex gap-2 mt-4 flex-wrap">

            {role === "ADMIN" && issue.status === "OPEN" && (
              <button
                onClick={() => handleAssign(issue.id)}
                className="px-3 py-1 bg-blue-500/20 rounded"
              >
                Assign
              </button>
            )}
            {role === "ADMIN" && (
            <button
            onClick={() => handleDelete(issue.id)}
            className="px-3 py-1 bg-red-600/20 text-red-400 rounded hover:bg-red-600/40 transition"
            >
            Delete
          </button>
            )}

            {role === "ADMIN" &&
              canTransition(issue.status, "APPROVED") && (
                <button
                  onClick={() =>
                    handleStatusChange(issue.id, "APPROVED")
                  }
                  className="px-3 py-1 bg-green-500/20 rounded"
                >
                  Approve
                </button>
              )}

            {role === "ADMIN" &&
              canTransition(issue.status, "CLOSED") && (
                <button
                  onClick={() =>
                    handleStatusChange(issue.id, "CLOSED")
                  }
                  className="px-3 py-1 bg-red-500/20 rounded"
                >
                  Close
                </button>
              )}

            {role === "USER" &&
              issue.assignedUser === userEmail &&
              canTransition(issue.status, "IN_PROGRESS") && (
                <button
                  onClick={() =>
                    handleStatusChange(issue.id, "IN_PROGRESS")
                  }
                  className="px-3 py-1 bg-yellow-500/20 rounded"
                >
                  Start
                </button>
              )}

            {role === "USER" &&
              issue.assignedUser === userEmail &&
              canTransition(issue.status, "RESOLVED") && (
                <button
                  onClick={() =>
                    handleStatusChange(issue.id, "RESOLVED")
                  }
                  className="px-3 py-1 bg-purple-500/20 rounded"
                >
                  Resolve
                </button>
              )}

          </div>
        </div>
      ))}
    </div>
  )}

  <div className="flex justify-between mt-6">
    <button
      disabled={filters.page === 1}
      onClick={() =>
        setFilters({ ...filters, page: filters.page - 1 })
      }
      className="px-4 py-2 bg-white/10 rounded"
    >
      Prev
    </button>

    <span>Page {filters.page}</span>

    <button
      disabled={filters.page * filters.limit >= total}
      onClick={() =>
        setFilters({ ...filters, page: filters.page + 1 })
      }
      className="px-4 py-2 bg-white/10 rounded"
    >
      Next
    </button>
  </div>

  {selectedImage && (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative p-4 bg-black rounded-xl">
        <button
          onClick={() => setSelectedImage(null)}
          className="absolute top-2 right-2 text-white text-xl"
        >
          ✖
        </button>
        <img src={selectedImage} className="max-h-[80vh]" />
      </div>
    </div>
  )}
</div>

);
}
