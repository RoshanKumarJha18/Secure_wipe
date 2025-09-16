import express from "express";
import cors from "cors";

// --- Basic Setup ---
const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---

// CORS Configuration
// In production (like on Render), it will only allow requests from the URL
// you set in the FRONTEND_URL environment variable.
// For local development, it allows requests from any origin.
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// --- In-Memory Database ---
// This is a simple in-memory array to store device data.
// It will reset every time the server restarts.
let devices = [
  { id: "SSD-001", model: "Samsung 970 EVO Plus", serialNo: "SN12345", status: "Available", wipeMethod: null, addedAt: new Date().toISOString() },
  { id: "HDD-002", model: "Seagate Barracuda 2TB", serialNo: "SN67890", status: "Available", wipeMethod: null, addedAt: new Date().toISOString() },
  { id: "LAP-003", model: "Dell Latitude 7420", serialNo: "SN11121", status: "Available", wipeMethod: null, addedAt: new Date().toISOString() },
];

// --- Routes ---

// Health check route to easily see if the server is running
app.get("/", (req, res) => {
  res.status(200).send("Secure Wipe Backend is up and running!");
});

// Get all devices
app.get("/api/devices", (req, res) => {
  res.status(200).json(devices);
});

// Add a new device
app.post("/api/devices", (req, res) => {
  let { id, model, serialNo } = req.body;

  if (!model) {
    return res.status(400).json({ error: "Device model is required." });
  }

  // Generate a unique ID and a placeholder serial number if not provided
  if (!id) id = `MANUAL-${Math.random().toString(36).substr(2, 9)}`;
  if (!serialNo) serialNo = `SN-MANUAL-${Math.random().toString(36).substr(2, 6)}`;

  const newDevice = { id, model, serialNo, status: "Available", wipeMethod: null, addedAt: new Date().toISOString() };
  devices.push(newDevice);

  console.log("Added device:", newDevice);
  res.status(201).json(newDevice);
});

// Wipe a specific device
app.post("/api/devices/:id/wipe", (req, res) => {
  const { id } = req.params;
  const { method } = req.body;

  const device = devices.find((d) => d.id === id);

  if (!device) {
    return res.status(404).json({ error: "Device not found." });
  }

  device.status = "Wiped";
  device.wipeMethod = method;
  device.wipedAt = new Date().toISOString();

  console.log("Wiped device:", device);
  res.status(200).json(device);
});

// --- Server Activation ---
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});