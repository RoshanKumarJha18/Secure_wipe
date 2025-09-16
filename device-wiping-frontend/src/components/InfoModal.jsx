import React from 'react';
import { motion } from 'framer-motion';

const InfoModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg border border-gray-700"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
          <div className="text-gray-400 space-y-4">
            {children}
          </div>
        </div>
        <div className="p-4 bg-gray-900/50 rounded-b-lg flex justify-end gap-4">
          <button onClick={onClose} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
            Got it
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoModal;