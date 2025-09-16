import axios from "axios";

const API_URL = "/api";

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
    const response = await axios.post(`${API_URL}/wipe`, { id, method });
    return response.data;
  } catch (error) {
    console.error("Failed to wipe device:", error.message);
    throw error;
  }
};

export const detectDevice = async () => {
  if (navigator.usb) {
    try {
      // This part for WebUSB is fine as it creates a realistic model and serial.
      const device = await navigator.usb.requestDevice({ filters: [] });
      const id = `USB-${Math.random().toString(36).substr(2, 9)}`;
      const model = device.productName || `USB Device ${id}`;
      const serialNo = device.serialNumber || `SN${Math.random().toString(36).substr(2, 8)}`;
      return await addDevice({ id, model, serialNo });
    } catch (error) {
      // Check if the error is due to the user canceling the prompt.
      // The error message can vary slightly between browsers.
      if (error.name === 'NotFoundError' || error.message.includes('No device selected')) {
        console.log("User cancelled the device selection.");
        return null; // Return null to prevent adding a fallback device.
      }
      console.error("WebUSB error:", error); // Log other errors
    }
  }
  // Fallback simulation
  // This should also only send the model, allowing the backend to generate the ID and Serial,
  // just like a manual add.
  const model = `Simulated USB Device ${Math.random().toString(36).substr(2, 4)}`;
  const fallbackDevice = await addDevice({ model });
  return fallbackDevice;
};