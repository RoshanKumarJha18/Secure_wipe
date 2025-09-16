import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

// Allow requests from the local frontend and the deployed frontend on Vercel.
// The FRONTEND_URL will be set as an environment variable in Vercel.
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Create a router for API endpoints
const apiRouter = express.Router();

// Demo devices
let devices = [
  { id: "SSD-001", model: "Samsung 970 EVO Plus", serialNo: "SN12345", status: "Available", wipeMethod: null, addedAt: new Date().toISOString() },
  { id: "HDD-002", model: "Seagate Barracuda 2TB", serialNo: "SN67890", status: "Available", wipeMethod: null, addedAt: new Date().toISOString() },
  { id: "LAP-003", model: "Dell Latitude 7420", serialNo: "SN11121", status: "Available", wipeMethod: null, addedAt: new Date().toISOString() },
];

// A simple root route to check if the server is up and running
app.get("/", (req, res) => {
  res.send("Secure Wipe Backend is running. Visit /api for API routes.");
});

// Root endpoint
apiRouter.get("/", (req, res) => {
  res.send("Secure Wipe Backend is running.");
});

// Get all devices
apiRouter.get("/devices", (req, res) => {
  res.json(devices);
});

// Add a new device
apiRouter.post("/devices", (req, res) => {
  let { id, model, serialNo } = req.body;
  if (!model) return res.status(400).json({ error: "Model required" });

  // Generate id and serialNo if not provided
  if (!id) id = `MANUAL-${Math.random().toString(36).substr(2, 9)}`;
  if (!serialNo) serialNo = `SN-MANUAL-${Math.random().toString(36).substr(2, 6)}`;

  const newDevice = { id, model, serialNo, status: "Available", wipeMethod: null, addedAt: new Date().toISOString() };
  devices.push(newDevice);
  res.status(201).json(newDevice); // 201 Created is more appropriate for a new resource
});

// Wipe device
apiRouter.post("/devices/:id/wipe", (req, res) => {
  const { id } = req.params;
  const { method } = req.body;
  const device = devices.find((d) => d.id === id);
  if (!device) return res.status(404).json({ error: "Device not found." });
  device.status = "Wiped";
  device.wipeMethod = method;
  device.wipedAt = new Date().toISOString();
  res.json(device);
});

// Use the router for all /api routes
app.use("/api", apiRouter);

// Start the server for local development
// This block will not run in a serverless environment like Vercel
// because Vercel imports the `app` object instead of running the file directly.
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel's serverless environment
export default app;