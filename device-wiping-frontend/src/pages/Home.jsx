import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const StepIcon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const FeatureIcon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export default function Home() {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  };

  const faqData = [
    {
      question: "What are the wiping standards used?",
      answer: "We support three main standards: Quick (1-pass random data), Full (3-pass with verification), and DoD 5220.22-M (7-pass for maximum security), ensuring data is irrecoverable."
    },
    {
      question: "Is my device's actual data affected?",
      answer: "No, this is a simulator. The application demonstrates the process of secure data erasure without touching the actual data on your physical device. It's completely safe to use."
    },
    {
      question: "What is a tamper-proof certificate?",
      answer: "After a successful wipe, the system generates a PDF certificate containing details of the wipe (device model, serial, method, date). This serves as a verifiable record for compliance and auditing purposes."
    },
    {
      question: "Why is secure wiping important for sustainability?",
      answer: "By ensuring data is securely and permanently erased, devices can be safely reused, resold, or donated instead of being physically destroyed. This promotes a circular economy and significantly reduces electronic waste."
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black relative">
      {/* Cosmic Noise */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, transparent 40%), linear-gradient(120deg, #0f0e17 0%, #1a1b26 100%)"
        }}
      />
      {/* Page Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Welcome to <span className="text-indigo-400">SecureWipe </span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Securely wipe SSDs, HDDs, and laptops with NIST 800-88 and DoD 5220.22-M standards. Ensure compliance and sustainability.
            </p>
            <div className="mt-8">
              <Link to="/devices" className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg shadow-indigo-500/20">
                Start Wiping Now
              </Link>
            </div>
          </motion.div>

          {/* How It Works Section */}
          <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.3 }} className="my-24 text-left">
            <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works in 3 Simple Steps</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div variants={cardVariants} className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-800/80 border border-indigo-500/30 mb-4"><StepIcon path="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></div>
                <h3 className="text-xl font-semibold text-white mb-2">1. Connect & Detect</h3>
                <p className="text-gray-400">Connect your device and use the "Detect USB Device" feature, or manually add it to the list.</p>
              </motion.div>
              <motion.div variants={cardVariants} className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-800/80 border border-indigo-500/30 mb-4"><StepIcon path="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></div>
                <h3 className="text-xl font-semibold text-white mb-2">2. Choose Wipe Method</h3>
                <p className="text-gray-400">Select a wiping standard: Quick (1-pass), Full (3-pass), or the highly secure DoD (7-pass) method.</p>
              </motion.div>
              <motion.div variants={cardVariants} className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-800/80 border border-indigo-500/30 mb-4"><StepIcon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></div>
                <h3 className="text-xl font-semibold text-white mb-2">3. Receive Certificate</h3>
                <p className="text-gray-400">After the wipe is complete, a tamper-proof certificate is generated for your compliance records.</p>
              </motion.div>
            </div>
          </motion.div>


          {/* Key Features Section */}
          <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.2 }} className="my-24 text-left">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Core Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div variants={cardVariants} className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <FeatureIcon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                <h3 className="text-lg font-semibold text-white mt-4 mb-2">Multiple Wipe Standards</h3>
                <p className="text-gray-400 text-sm">Choose from DoD 5220.22-M, 3-pass, and 1-pass algorithms.</p>
              </motion.div>
              <motion.div variants={cardVariants} className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <FeatureIcon path="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                <h3 className="text-lg font-semibold text-white mt-4 mb-2">Automatic USB Detection</h3>
                <p className="text-gray-400 text-sm">Utilizes the WebUSB API to detect and identify connected devices.</p>
              </motion.div>
              <motion.div variants={cardVariants} className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <FeatureIcon path="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                <h3 className="text-lg font-semibold text-white mt-4 mb-2">Compliance Certificates</h3>
                <p className="text-gray-400 text-sm">Generates tamper-proof PDF reports for every completed wipe.</p>
              </motion.div>
              <motion.div variants={cardVariants} className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <FeatureIcon path="M13 10V3L4 14h7v7l9-11h-7z" />
                <h3 className="text-lg font-semibold text-white mt-4 mb-2">Real-time Terminal</h3>
                <p className="text-gray-400 text-sm">Watch the wiping process unfold in a realistic, animated terminal.</p>
              </motion.div>
            </div>
          </motion.div>


          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-left">
            <motion.div variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/10 hover:border-indigo-500/50 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-white mb-3">Data Security</h2>
              <p className="text-gray-400">
                Prevent data breaches with secure wiping, ensuring permanent data erasure and regulatory compliance.
              </p>
            </motion.div>
            <motion.div variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/10 hover:border-indigo-500/50 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-white mb-3">Wiping Standards</h2>
              <p className="text-gray-400">
                Choose Quick (1-pass), Full (3-pass), or DoD (7-pass) methods. Get tamper-proof PDF certificates.
              </p>
            </motion.div>
            <motion.div variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/10 hover:border-indigo-500/50 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-white mb-3">Sustainability</h2>
              <p className="text-gray-400">Reduce e-waste by up to 80% (EPA estimate) with secure IT asset reuse.</p>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.2 }} className="my-24 max-w-3xl mx-auto text-left">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left p-5 font-semibold text-white"
                  >
                    <span>{faq.question}</span>
                    <motion.span animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="text-gray-400 p-5 pt-0">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Compliance Section */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} className="bg-white/5 backdrop-blur-md p-10 rounded-xl border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Compliance & Trust</h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-6">SecureWipe adheres to NIST SP 800-88 and DoD 5220.22-M standards, ensuring compliance for enterprises and data centers.</p>
            <Link to="/about" className="text-indigo-400 font-semibold hover:text-indigo-300">Learn More &rarr;</Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}