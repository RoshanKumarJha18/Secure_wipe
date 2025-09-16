import React, { useState } from "react";
import { addDevice as apiAddDevice } from "../api.jsx";

export default function AddDevice({ setDevices }) {
  const [model, setModel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!model.trim()) {
      // Basic validation
      return;
    }
    try {
      setIsSubmitting(true);
      // The backend will generate the id, serialNo, etc.
      const newDevice = { model };
      const addedDevice = await apiAddDevice(newDevice); // Call API to add device
      setDevices((prev) => [...prev, addedDevice]); // Update parent state with API response
      setModel("");
    } catch (error) {
      console.error("Error adding device:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-2">
          Add New Device by Model
        </label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., Samsung 970 EVO"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Adding..." : "Add Device"}
      </button>
    </form>
  );
}