import { useState, useEffect } from "react";
import { createIssue, uploadImage } from "../services/api";

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

const fetchLocations = async () => {
try {
const res = await fetch(`${API_URL}/locations/tree`);
const data = await res.json();


  setLocations(data);

  const buildingList = data.filter(l => l.type === "BUILDING");
  setBuildings(buildingList);

} catch (err) {
  console.error("Failed to fetch locations", err);
}

};

useEffect(() => {
fetchLocations();
}, []);

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleBuildingChange = (e) => {
const buildingId = e.target.value;
setSelectedBuilding(buildingId);

const selected = locations.find(l => l.id == buildingId);

if (selected) {
  setFloors(selected.children || []);
} else {
  setFloors([]);
}

// reset floor selection
setForm({ ...form, locationId: "" });

};

const handleFloorChange = (e) => {
setForm({ ...form, locationId: e.target.value });
};

const handleFile = (e) => {
const selected = e.target.files[0];
setFile(selected);
setPreview(URL.createObjectURL(selected));
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

  setMessage("✅ Issue Created Successfully!");

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

} catch (err) {
  console.error(err);
  setMessage("❌ Failed to create issue");
} finally {
  setLoading(false);
}

};

return ( <div className="pt-24 px-6 flex justify-center text-white">

```
  <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">

    <h2 className="text-2xl font-bold mb-6">
      Create Issue 🛠️
    </h2>

    {message && (
      <p className="mb-4 text-center">{message}</p>
    )}

    <form onSubmit={handleSubmit} className="space-y-5">

      <textarea
        name="description"
        placeholder="Issue Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg bg-white/20 border border-white/20"
      />

      <input
        name="referenceStandard"
        placeholder="Reference Standard"
        value={form.referenceStandard}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-white/20 border border-white/20"
      />

      <input
        name="actionPlan"
        placeholder="Action Plan"
        value={form.actionPlan}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-white/20 border border-white/20"
      />

      {/* 🔥 BUILDING SELECT */}
      <select
        value={selectedBuilding}
        onChange={handleBuildingChange}
        className="w-full p-3 rounded-lg bg-white/20 border border-white/20"
      >
        <option value="">Select Building</option>
        {buildings.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      {/* 🔥 FLOOR SELECT */}
      <select
        value={form.locationId}
        onChange={handleFloorChange}
        disabled={!selectedBuilding}
        className="w-full p-3 rounded-lg bg-white/20 border border-white/20"
      >
        <option value="">Select Floor</option>
        {floors.map((f) => (
          <option key={f.id} value={f.id}>
            {f.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        onChange={handleFile}
        className="w-full text-sm"
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full h-40 object-cover rounded-lg"
        />
      )}

      <button
        disabled={loading}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.02] transition"
      >
        {loading ? "Submitting..." : "Submit Issue"}
      </button>

    </form>
  </div>
</div>
);
}
