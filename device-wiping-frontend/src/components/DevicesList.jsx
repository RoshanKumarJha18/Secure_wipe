import React from 'react';
import { motion } from 'framer-motion';

const Icon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);


const DevicesList = ({ devices, onStartWipe }) => {
  if (devices.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No devices found. Add or detect a device to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-2">
      {devices.map((device, index) => (
        <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-800 rounded-lg shadow-md p-5 flex flex-col justify-between border border-gray-700/50 hover:border-indigo-500/60 hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1"
        >
            <div>
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white">{device.model}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        device.status === 'Wiped' 
                        ? 'bg-indigo-500/20 text-indigo-300' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                        {device.status}
                    </span>
                </div>
                <div className="text-sm text-gray-400 space-y-1">
                    <p className="flex items-center"><Icon path="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /><span className="font-semibold text-gray-300 mr-1">ID:</span> {device.id}</p>
                    <p className="flex items-center"><Icon path="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-1.026.977-2.243.977-3.632a8 8 0 10-15.736 0c0 .307.021.61.061.914" /><span className="font-semibold text-gray-300 mr-1">Serial:</span> {device.serialNo}</p>
                    <p className="flex items-center"><Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /><span className="font-semibold text-gray-300 mr-1">Added:</span> {new Date(device.addedAt).toLocaleString()}</p>
                    {device.wipeMethod && (
                        <p className="flex items-center"><Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /><span className="font-semibold text-gray-300 mr-1">Wipe Method:</span> {device.wipeMethod}</p>
                    )}
                </div>
            </div>

            {device.status !== 'Wiped' && (
                <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col sm:flex-row gap-2">
                    <button
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
                        onClick={() => onStartWipe(device, 'Quick')}
                    >Quick Wipe</button>
                    <button
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
                        onClick={() => onStartWipe(device, 'Full')}
                    >Full Wipe</button>
                    <button
                        className="flex-1 bg-red-800/80 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
                        onClick={() => onStartWipe(device, 'DoD')}
                    >DoD Wipe</button>
                </div>
            )}
        </motion.div>
      ))}
    </div>
  );
};

export default DevicesList;