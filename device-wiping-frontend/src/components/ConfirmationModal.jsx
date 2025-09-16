import React from 'react';
import { motion } from 'framer-motion';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, device, method }) => {
  if (!isOpen) return null;

  const methodColors = {
    Quick: 'text-yellow-400',
    Full: 'text-orange-400',
    DoD: 'text-red-500',
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700"
      >
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Confirm Wipe Action</h2>
          <p className="text-gray-400 mb-4">
            Are you sure you want to perform a <strong className={methodColors[method]}>{method} Wipe</strong> on the device <strong className="text-white">{device.model}</strong>?
          </p>
          <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded-md">This action is for simulation purposes and cannot be undone.</p>
        </div>
        <div className="p-4 bg-gray-900/50 rounded-b-lg flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
            Confirm & Wipe
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;