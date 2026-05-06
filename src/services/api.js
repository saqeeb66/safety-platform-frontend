const BASE_URL = import.meta.env.VITE_API_URL;

const API = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.clear();
    window.location.href = "/";
    return;
  }

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Request failed");
  }

  return res.json();
};

export const getIssues = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return API(`/issues?${query}`);
};

export const createIssue = (data) =>
  API("/issues", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return API("/issues/upload", {
    method: "POST",
    body: formData,
  });
};

// 🔥 DASHBOARD
export const getStats = () => API("/issues/stats");

export const getDashboard = () => API("/issues/dashboard");

// 🔥 ACTIONS
export const assignIssue = (id, email) =>
  API(`/issues/${id}/assign`, {
    method: "POST",
    body: JSON.stringify({ userEmail: email }),
  });

export const updateIssueStatus = (id, status) =>
  API(`/issues/${id}/status`, {
    method: "POST",
    body: JSON.stringify({ status }),
  });

export const downloadCSV = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();

  const data = await API(`/issues?${query}`);

  const rows = data.data || [];

  const csv = [
    ["ID", "Description", "Status", "Location", "Created"],
    ...rows.map((i) => [
      i.id,
      i.description,
      i.status,
      i.location?.name || "",
      new Date(i.createdAt).toLocaleDateString(),
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "issues.csv";
  a.click();
};

export const getLogs = () => API("/audit")

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
};