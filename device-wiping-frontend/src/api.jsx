import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "https://secure-wipe.onrender.com/api").replace(/\/$/, '');  
//http://localhost:5001/api
export const getDevices = async () => {
  try {
    const response = await axios.get(`${API_URL}/devices`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch devices:", error.message, error.response?.status);
    throw error;
  }
};

export const addDevice = async (device) => {
  try {
    // The backend now expects an object with just a model,
    // and it will generate the id and serialNo.
    // We just pass the device object through.
    const response = await axios.post(`${API_URL}/devices`, device);
    return response.data;
  } catch (error) {
    console.error("Failed to add device:", error.message);
    throw error;
  }
};

export const wipeDevice = async (id, method) => {
  try {
    // Using a more RESTful endpoint structure, assuming the backend is set up for it.
    // e.g., POST /api/devices/{id}/wipe
    const response = await axios.post(`${API_URL}/devices/${id}/wipe`, { method });
    return response.data;
  } catch (error) {
    console.error("Failed to wipe device:", error.message);
    throw error;
  }
};

export const detectDevice = async () => {
  if (navigator.usb) {
    try {
      const device = await navigator.usb.requestDevice({ filters: [] });
      // The backend will generate the ID and serial number.
      // We only need to send the model information we can gather.
      const model = device.productName || `WebUSB Device ${device.vendorId}:${device.productId}`;
      const serialNumber = device.serialNumber;
      return await addDevice({ model, serialNo: serialNumber });
    } catch (error) {
      if (error.name === 'NotFoundError' || error.message.includes('No device selected')) {
        console.log("User cancelled the device selection.");
        return null; // Return null to prevent adding a fallback device.
      }
      console.error("WebUSB error:", error); // Log other errors
      // Don't fall back to simulation if WebUSB fails for reasons other than cancellation.
      throw error;
    }
  }
  // Fallback simulation
  console.log("WebUSB not supported, creating a simulated device.");
  const model = `Simulated USB Device ${Math.random().toString(36).substr(2, 4)}`;
  const fallbackDevice = await addDevice({ model });
  return fallbackDevice;
};