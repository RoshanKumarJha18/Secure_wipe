import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCount } from "../utils/counter";

const Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CounterButton = () => {
  const [count, setCount] = useState(getCount());

  // This effect will listen for our custom event to update the count
  // and update the component automatically.
  useEffect(() => {
    const handleStorageChange = () => {
      setCount(getCount());
    };
    window.addEventListener('storage_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage_updated', handleStorageChange);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 text-center w-full shadow-lg"
    >
        <div className="flex items-center justify-center gap-4">
            <Icon />
            <div>
                <p className="text-3xl font-bold text-indigo-400">{count}</p>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Devices Wiped</h3>
            </div>
        </div>
    </motion.div>
  );
};

export default CounterButton;