import { useState, useEffect } from "react";
import { createIssue, uploadImage } from "../services/api";
import {
  Building2,
  Layers3,
  FileText,
  ShieldCheck,
  ClipboardList,
  UploadCloud,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function CreateIssue() {
  const [form, setForm] = useState({
    description: "",
    referenceStandard: "",
    actionPlan: "",
    locationId: "",
  });

  const [locations, setLocations] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);

  const [selectedBuilding, setSelectedBuilding] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchLocations = async () => {
    try {
      const res = await fetch(`${API_URL}/locations/tree`);
      const data = await res.json();

      setLocations(data);

      const buildingList = data.filter(
        (l) => l.type === "BUILDING"
      );

      setBuildings(buildingList);
    } catch (err) {
      console.error("Failed to fetch locations", err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBuildingChange = (e) => {
    const buildingId = e.target.value;
    setSelectedBuilding(buildingId);

    const selected = locations.find(
      (l) => l.id == buildingId
    );

    if (selected) {
      setFloors(selected.children || []);
    } else {
      setFloors([]);
    }

    setForm({
      ...form,
      locationId: "",
    });
  };

  const handleFloorChange = (e) => {
    setForm({
      ...form,
      locationId: e.target.value,
    });
  };

  const handleFile = (e) => {
    const selected = e.target.files[0];

    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      let imagePath = "";

      if (file) {
        const uploadRes = await uploadImage(file);
        imagePath = uploadRes.imagePath;
      }

      await createIssue({
        ...form,
        image: imagePath,
        locationId: Number(form.locationId),
      });

      setSuccess(true);
      setMessage("Issue Created Successfully!");

      setForm({
        description: "",
        referenceStandard: "",
        actionPlan: "",
        locationId: "",
      });

      setSelectedBuilding("");
      setFloors([]);
      setFile(null);
      setPreview(null);

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (err) {
      console.error(err);
      setSuccess(false);
      setMessage("Failed to create issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white flex items-center justify-center px-4 py-28">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/30 blur-[140px] rounded-full animate-pulse"></div>

        <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-fuchsia-500/30 blur-[150px] rounded-full animate-pulse"></div>

        <div className="absolute top-[30%] left-[40%] w-[250px] h-[250px] bg-indigo-500/20 blur-[120px] rounded-full"></div>

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]"></div>
      </div>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-3xl">

        <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] transition-all duration-500 hover:scale-[1.01]">

          {/* SHINE EFFECT */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
            <div className="absolute top-0 left-[-100%] h-full w-[40%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl animate-[shine_3s_linear_infinite]" />
          </div>

          {/* HEADER */}
          <div className="relative border-b border-white/10 p-8 md:p-10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>
                <div className="flex items-center gap-3 mb-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>

                  <div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                      Create Issue
                    </h1>

                    <p className="text-sm text-gray-300 mt-1">
                      Smart crystal UI reporting experience
                    </p>
                  </div>
                </div>

               
              </div>

              <div className="hidden md:flex items-center justify-center h-24 w-24 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <ClipboardList className="w-10 h-10 text-cyan-300 animate-bounce" />
              </div>

            </div>
          </div>

          {/* MESSAGE */}
          {message && (
            <div
              className={`mx-8 mt-6 rounded-2xl border px-5 py-4 flex items-center gap-3 backdrop-blur-xl animate-[fadeIn_.5s_ease]
                ${
                  success
                    ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-300"
                    : "bg-red-500/15 border-red-400/30 text-red-300"
                }`}
            >
              {success ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}

              <span className="font-medium">{message}</span>
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 md:p-10"
          >

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <FileText className="w-4 h-4" />
                Issue Description
              </label>

              <textarea
                name="description"
                placeholder="Describe the issue in detail..."
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white placeholder:text-gray-400 backdrop-blur-xl outline-none transition-all duration-300 focus:border-cyan-400/60 focus:bg-white/15 focus:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
              />
            </div>

            {/* REFERENCE */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <ShieldCheck className="w-4 h-4" />
                Reference Standard
              </label>

              <input
                name="referenceStandard"
                placeholder="Enter reference standard"
                value={form.referenceStandard}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white placeholder:text-gray-400 backdrop-blur-xl outline-none transition-all duration-300 focus:border-cyan-400/60 focus:bg-white/15 focus:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
              />
            </div>

            {/* ACTION PLAN */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <ClipboardList className="w-4 h-4" />
                Action Plan
              </label>

              <input
                name="actionPlan"
                placeholder="Enter action plan"
                value={form.actionPlan}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white placeholder:text-gray-400 backdrop-blur-xl outline-none transition-all duration-300 focus:border-fuchsia-400/60 focus:bg-white/15 focus:shadow-[0_0_30px_rgba(217,70,239,0.2)]"
              />
            </div>

            {/* BUILDING */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <Building2 className="w-4 h-4" />
                Select Building
              </label>

              <select
                value={selectedBuilding}
                onChange={handleBuildingChange}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white backdrop-blur-xl outline-none transition-all duration-300 focus:border-cyan-400/60 focus:bg-white/15"
              >
                <option className="bg-[#0b1120]" value="">
                  Select Building
                </option>

                {buildings.map((b) => (
                  <option
                    className="bg-[#0b1120]"
                    key={b.id}
                    value={b.id}
                  >
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* FLOOR */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <Layers3 className="w-4 h-4" />
                Select Floor
              </label>

              <select
                value={form.locationId}
                onChange={handleFloorChange}
                disabled={!selectedBuilding}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white backdrop-blur-xl outline-none transition-all duration-300 focus:border-fuchsia-400/60 focus:bg-white/15 disabled:opacity-40"
              >
                <option className="bg-[#0b1120]" value="">
                  Select Floor
                </option>

                {floors.map((f) => (
                  <option
                    className="bg-[#0b1120]"
                    key={f.id}
                    value={f.id}
                  >
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* FILE UPLOAD */}
            <div className="md:col-span-2">

              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <UploadCloud className="w-4 h-4" />
                Upload Evidence
              </label>

              <div className="relative rounded-3xl border border-dashed border-white/20 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10">

                <input
                  type="file"
                  onChange={handleFile}
                  className="w-full cursor-pointer text-sm text-gray-300
                  file:mr-4
                  file:rounded-xl
                  file:border-0
                  file:bg-gradient-to-r
                  file:from-cyan-500
                  file:to-blue-600
                  file:px-5
                  file:py-3
                  file:text-white
                  file:font-semibold
                  hover:file:scale-105"
                />

                <p className="mt-3 text-sm text-gray-400">
                  Drag and drop or upload screenshots/images
                </p>
              </div>
            </div>

            {/* PREVIEW */}
            {preview && (
              <div className="md:col-span-2 animate-[fadeIn_.5s_ease]">

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">

                  <img
                    src={preview}
                    alt="preview"
                    className="h-[300px] w-full rounded-2xl object-cover transition duration-500 hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10"></div>
                </div>
              </div>
            )}

            {/* BUTTON */}
            <div className="md:col-span-2 pt-2">

              <button
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-8 py-5 text-lg font-bold text-white shadow-[0_10px_40px_rgba(59,130,246,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_60px_rgba(168,85,247,0.45)] active:scale-[0.98]"
              >

                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute top-0 left-[-100%] h-full w-[35%] rotate-12 bg-white/30 blur-2xl animate-[shine_2s_linear_infinite]" />
                </div>

                <span className="relative z-10">
                  {loading
                    ? "Submitting..."
                    : "Submit Issue"}
                </span>

                {!loading && (
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* CUSTOM ANIMATIONS */}
      <style>{`
        @keyframes shine {
          100% {
            left: 200%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}
