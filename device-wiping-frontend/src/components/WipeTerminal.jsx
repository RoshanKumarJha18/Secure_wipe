import React, { useState, useEffect, useRef } from "react";
import { generatePDF } from "../pdf.js";

const WipeTerminal = ({ device, onDone }) => {
  const [log, setLog] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [log]);

  useEffect(() => {
    setLog([
      { type: 'info', text: `Starting ${device.method} wipe on ${device.model} (ID: ${device.id}, Serial: ${device.serialNo})...` },
      { type: 'info', text: `Initialized at ${new Date().toLocaleString()}` },
    ]);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setLog((prevLog) => [
            ...prevLog,
            { type: 'success', text: `Wipe completed successfully at ${new Date().toLocaleString()}` },
            { type: 'success', text: 'Generating compliance certificate...' },
          ]);
          const updatedDevice = { ...device, status: "Wiped", wipedAt: new Date().toISOString() };
          
          setTimeout(() => {
            onDone(updatedDevice);
            // Automatically download certificate
            const doc = generatePDF({
              device: device.model,
              id: device.id,
              serialNo: device.serialNo,
              method: device.method,
              status: "Wiped",
              date: new Date().toISOString(),
              addedAt: device.addedAt,
            });
            doc.save(`Wipe_Certificate_${device.id}.pdf`);
          }, 1000);

          return 100;
        }
        const newProgress = prev + 10;
        setLog((prevLog) => [...prevLog, { type: 'progress', text: `Wiping block ${Math.floor(Math.random() * 9000) + 1000}... Progress: ${newProgress}%` }]);
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [device.id, device.method, device.model, device.serialNo, device.addedAt, onDone]);

  return (
    <div className="bg-black p-4 rounded-lg text-sm font-mono overflow-auto max-h-80 border border-gray-700">
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
        <div
          className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-linear"
          style={{ width: `${progress}%`}}
        ></div>
      </div>
      <div className="text-left h-64 overflow-y-auto">
        {log.map((entry, index) => (
          <p key={index} className={`${entry.type === 'success' ? 'text-indigo-400' : entry.type === 'info' ? 'text-blue-400' : 'text-gray-300'}`}>
            <span className="text-gray-500 mr-2">$</span>{entry.text}
          </p>
        ))}
        {!isComplete && <div className="inline-block h-4 w-2 bg-indigo-400 animate-pulse ml-2" />}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default WipeTerminal;