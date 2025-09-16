import React, { useEffect, useState } from "react";
import { getDevices, wipeDevice, detectDevice, addDevice } from "../api.jsx";
import AddDevice from "../components/AddDevice";
import DevicesList from "../components/DevicesList";
import WipeTerminal from "../components/WipeTerminal";
import CounterButton from "../components/CounterButton";
import InfoModal from "../components/InfoModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { incrementCount } from "../utils/counter";
import { motion } from "framer-motion";
import { getHostDeviceModel } from "../utils/hostDetector.js";

const DevicePage = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [error, setError] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [wipeConfirmation, setWipeConfirmation] = useState(null);
  const [showMethodGuide, setShowMethodGuide] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setError(null);
        const data = await getDevices();
        setDevices(data);
      } catch (error) {
        console.error("Error fetching devices:", error);
        setError("Failed to load devices. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
    setShowMethodGuide(true);

  }, []);

  const handleDetectDevice = async () => {
    try {
      setIsDetecting(true);
      setError(null);
      const detectedDevice = await detectDevice();
      if (detectedDevice) {
        setDevices((prev) => [...prev, detectedDevice]);
      }
    } catch (error) {
      console.error("Error detecting device:", error);
      setError("Failed to detect USB device. Please try again.");
    } finally {
      setIsDetecting(false);
    }
  };

  const handleDetectHostDevice = async () => {
    try {
      setError(null);
      const model = getHostDeviceModel();
      // Prevent adding duplicate host device
      if (devices.some(d => d.model === model)) {
        setError("Host device has already been added.");
        return;
      }
      const newDevice = { model };
      const addedDevice = await addDevice(newDevice);
      setDevices((prev) => [...prev, addedDevice]);
    } catch (error) {
      console.error("Error detecting host device:", error);
      setError("Failed to add host device.");
    }
  };
  const handleWipeRequest = (device, method) => {
    setWipeConfirmation({ device, method });
  };

  const handleWipeConfirm = async () => {
    if (!wipeConfirmation) return;

    const { device, method } = wipeConfirmation;
    try {
      setError(null);
      const updatedDevice = await wipeDevice(device.id, method);
      setDevices((prev) =>
        prev.map((d) => (d.id === device.id ? updatedDevice : d))
      );
      setSelectedDevice({ ...updatedDevice, method });
      setWipeConfirmation(null);
    } catch (error) {
      console.error("Error wiping device:", error);
      setError("Failed to wipe device. Please try again.");
    } finally {
      setWipeConfirmation(null);
    }
  };

  const handleWipeDone = (updatedDevice) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === updatedDevice.id ? updatedDevice : d))
    );
    incrementCount(); // Increment count after wipe is confirmed done.
    setSelectedDevice(null);
  };

  const handleCloseGuide = () => {
    setShowMethodGuide(false);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-transparent border-indigo-400 rounded-full animate-spin"></div>
          <p className="text-xl text-gray-300">Loading devices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Device Management</h1>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            Securely wipe devices with NIST-compliant standards. Track progress and receive compliance certificates automatically.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-8 text-center border border-red-500/30">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Actions */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Device Actions</h3>
              <div className="space-y-4">
                <AddDevice setDevices={setDevices} />
                <button 
                  onClick={handleDetectDevice} 
                  disabled={isDetecting}
                  className="w-full relative inline-flex items-center justify-center bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
                >
                  {isDetecting && <div className="absolute left-4 w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>}
                  <span>Detect USB Device</span>
                </button>
                <button
                  onClick={handleDetectHostDevice}
                  className="w-full relative inline-flex items-center justify-center bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20"
                >
                  <span>Detect Host Device</span>
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <CounterButton />
            </div>
          </div>

          {/* Right Column: Devices List */}
          <div className="lg:col-span-2 bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700/50 shadow-lg">
            <DevicesList devices={devices} onStartWipe={handleWipeRequest} />
          </div>
        </div>
      </motion.div>

      {/* Wipe Terminal Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl border border-gray-700/50">
            <div className="p-6 border-b border-gray-700/50"><h2 className="text-xl font-bold text-white">Wiping: <span className="text-indigo-400">{selectedDevice.model} ({selectedDevice.id})</span></h2></div>
            <div className="p-6"><WipeTerminal device={selectedDevice} onDone={handleWipeDone} /></div>
            <div className="p-4 bg-gray-800/50 rounded-b-lg flex justify-end"><button onClick={() => setSelectedDevice(null)} className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">Close</button></div>
          </motion.div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!wipeConfirmation}
        onClose={() => setWipeConfirmation(null)}
        onConfirm={handleWipeConfirm}
        device={wipeConfirmation?.device}
        method={wipeConfirmation?.method}
      />

      <InfoModal isOpen={showMethodGuide} onClose={handleCloseGuide} title="Wipe Method Guide">
        <div className="p-3 bg-gray-700/50 rounded-lg">
          <p className="font-semibold text-yellow-400">Quick Wipe (1-Pass)</p>
          <p className="text-gray-400 text-sm">Fastest method. Ideal for modern SSDs where multiple passes offer diminishing returns.</p>
        </div>
        <div className="p-3 bg-gray-700/50 rounded-lg">
          <p className="font-semibold text-orange-400">Full Wipe (3-Pass)</p>
          <p className="text-gray-400 text-sm">A good balance of security and speed. Overwrites data three times for added assurance.</p>
        </div>
        <div className="p-3 bg-gray-700/50 rounded-lg">
          <p className="font-semibold text-red-500">DoD Wipe (7-Pass)</p>
          <p className="text-gray-400 text-sm">Maximum security. Recommended for older HDDs containing highly sensitive data.</p>
        </div>
      </InfoModal>

    </div>
  );
};

export default DevicePage;