"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Eye, 
  Mic2, 
  Hand,
  Users,
  Target,
  Zap,
  LayoutGrid,
  FileText
} from 'lucide-react';

const ConduitCaseStudy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F3EDE2] to-[#E8DABF] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-900/10 via-purple-900/5 to-indigo-900/10"></div>
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black bg-linear-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
            Conduit
          </h1>
          <div className="max-w-4xl mx-auto mb-12">
            <motion.p 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-medium text-gray-700 mb-8"
            >
              <span className="block text-4xl md:text-5xl font-black text-transparent bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text">
                Accessibility That Adapts to You.
              </span>
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-6 py-3 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 text-lg font-semibold text-gray-800"
              >
                Hackalytics @ Georgia Tech
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="px-6 py-3 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 text-lg font-medium text-gray-700"
              >
                36 Hours • 4 People
              </motion.span>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 lg:px-8 pb-24 -mt-20 relative z-10"
      >
        {/* Meta Cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Role</h3>
            <p className="text-gray-700 font-medium">Lead UX Designer & Frontend Developer</p>
          </div>
          <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <LayoutGrid className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tools</h3>
            <p className="text-gray-700 font-medium">Electron, TypeScript, Figma</p>
          </div>
          <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Timeline</h3>
            <p className="text-gray-700 font-medium">36 Hours</p>
          </div>
          <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-12 h-12 bg-linear-to-r from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Focus</h3>
            <p className="text-gray-700 font-medium">Accessibility Design</p>
          </div>
        </motion.div>

        {/* Personas Section */}
        <motion.section variants={itemVariants} className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-black mb-12 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            Empathy First
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ava",
                age: "24",
                condition: "Cerebral Palsy",
                needs: "Eye tracking + Voice",
                icon: Eye,
                color: "from-blue-500 to-cyan-500"
              },
              {
                name: "Jalen", 
                age: "36",
                condition: "Paralysis (Neck Down)",
                needs: "Gaze + Speech + Bite Switch",
                icon: Mic2,
                color: "from-purple-500 to-pink-500"
              },
              {
                name: "Mina",
                age: "19", 
                condition: "Deaf & Nonverbal",
                needs: "ASL Gesture Recognition",
                icon: Hand,
                color: "from-emerald-500 to-teal-500"
              }
            ].map((persona, index) => (
              <motion.div
                key={persona.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 overflow-hidden"
              >
                <div className={`w-20 h-20 ${persona.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <persona.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">{persona.name}, {persona.age}</h3>
                <p className="text-lg text-gray-600 font-medium mb-4">{persona.condition}</p>
                <p className="text-blue-600 font-semibold text-lg">{persona.needs}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Core Features */}
        <motion.section variants={itemVariants} className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-black mb-12 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            Multimodal Magic
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "EEG Control", desc: "Brainwave cursor movement", icon: Brain, color: "from-indigo-500 to-blue-500" },
              { title: "Gaze Tracking", desc: "Eye-controlled navigation", icon: Eye, color: "from-blue-500 to-cyan-500" },
              { title: "Voice Commands", desc: "Speech-to-action", icon: Mic2, color: "from-purple-500 to-pink-500" },
              { title: "ASL Recognition", desc: "Gesture communication", icon: Hand, color: "from-emerald-500 to-teal-500" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:bg-white/90 transition-all duration-500 cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-all`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          variants={itemVariants}
          className="text-center py-24 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Accessibility, 
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                {' '}Redefined
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Conduit proves multimodal design can make complex accessibility feel intuitive and personal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#"
                className="px-10 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-lg"
              >
                View Prototype
              </a>
              <a 
                href="#"
                className="px-10 py-4 border-2 border-gray-200 bg-white/60 backdrop-blur-xl font-bold rounded-2xl hover:shadow-xl hover:bg-white transition-all duration-300 text-lg"
              >
                Case Study PDF
              </a>
            </div>
          </motion.div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default ConduitCaseStudy;