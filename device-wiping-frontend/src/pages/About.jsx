import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  const cardVariants = {
    offscreen: { y: 30, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="max-w-5xl mx-auto text-white">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold">About <span className="text-indigo-400">SecureWipe </span></h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            SecureWipe provides industry-leading data erasure solutions, ensuring compliance, security, and sustainability for IT asset management.
          </p>
          <a href="http://localhost:5000" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
            View Backend Dashboard &rarr;
          </a>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">Problem Statement</h2>
            <p className="text-gray-400">
              Inadequate data erasure risks data breaches and non-compliance. Many recycling processes lack verifiable methods, leaving sensitive data vulnerable.
            </p>
          </motion.div>

          <motion.div variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">Our Solution</h2>
            <p className="text-gray-400">
              SecureWipe  offers <strong>Quick</strong> (1-pass), <strong>Full</strong> (3-pass), and <strong>DoD</strong> (7-pass) wiping standards, with PDF certificates for audit compliance.
            </p>
          </motion.div>

          <motion.div variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">Compliance & Trust</h2>
            <p className="text-gray-400">
              Compliant with <strong>NIST 800-88</strong> and <strong>DoD 5220.22-M</strong>, SecureWipe provides tamper-proof certificates for regulatory audits.
            </p>
          </motion.div>

          <motion.div variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">Sustainability</h2>
            <p className="text-gray-400">
              Reduce e-waste by up to 80% (EPA estimate) with secure IT asset reuse, promoting a <strong>circular economy</strong>.
            </p>
          </motion.div>
        </div>

        {/* Sustainability Metrics */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} className="text-center bg-gray-800/50 p-10 rounded-xl">
          <h2 className="text-3xl font-bold text-white mb-6">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div><p className="text-4xl font-bold text-indigo-400">1,000+</p><p className="text-gray-400 mt-1">Organizations Served</p></div>
            <div><p className="text-4xl font-bold text-indigo-400">99.9%</p><p className="text-gray-400 mt-1">Erasure Success Rate</p></div>
            <div><p className="text-4xl font-bold text-indigo-400">80%</p><p className="text-gray-400 mt-1">E-Waste Reduction</p></div>
          </div>
          <Link to="/devices" className="mt-10 inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">
            Start Wiping Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}