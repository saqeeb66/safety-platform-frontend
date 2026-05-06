import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Issues from "./pages/Issues";
import CreateIssue from "./pages/CreateIssue";
import Login from "./pages/Login";
import AuditLogs from "./pages/AuditLogs";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/create" element={<CreateIssue />} />
        <Route path="/audit" element={<AuditLogs />} />
      </Routes>
    </>
  );
}

export default App;