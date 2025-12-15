'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, Loader2 } from 'lucide-react';

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    console.log('Form submitted');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50 },
    },
  };

  return (
    <section id="contact" className="relative w-full py-20 lg:py-32 bg-slate-950 overflow-hidden text-slate-50">
      {/* Background Gradients/Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="container mx-auto px-4 relative z-10 max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Content Column */}
          <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <span className="inline-block text-blue-400 font-bold text-sm tracking-[0.2em] mb-4 uppercase">
                // Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-50 to-slate-400">
                Let&apos;s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-violet-500">Amazing</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                Have a project in mind or want to discuss potential opportunities? 
                We&apos;d love to hear from you. Drop us a message and let&apos;s create 
                something extraordinary together.
              </p>
            </motion.div>

            <motion.div className="flex flex-col gap-6 mt-4" variants={containerVariants}>
              <ContactInfoItem 
                icon={<MapPin size={24} />}
                title="Our Location"
                details="8th Floor, One Airport Square, Airport City, Accra, Ghana"
              />
              <ContactInfoItem 
                icon={<Mail size={24} />}
                title="Email Us"
                details="hello@velvronlabs.com"
              />
              <ContactInfoItem 
                icon={<Phone size={24} />}
                title="Call Us"
                details="+233 (0) 55 123 4567"
              />
            </motion.div>
          </div>

          {/* Right Form Column */}
          <motion.div 
            variants={itemVariants}
            className="w-full"
          >
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
              {/* Subtle sheen effect on form hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup name="name" placeholder="Your Name" type="text" />
                  <InputGroup name="email" placeholder="Your Email" type="email" />
                </div>
                
                <InputGroup name="subject" placeholder="Subject" type="text" />
                
                <div className="space-y-2">
                  <textarea 
                    name="message" 
                    placeholder="Tell us about your project..." 
                    rows="5" 
                    required 
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-y min-h-[120px]"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

// Sub-component for Contact Info Items to keep code clean
const ContactInfoItem = ({ icon, title, details }) => (
  <motion.div 
    className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all duration-300 group"
    whileHover={{ x: 5 }}
  >
    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-900/20">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-semibold text-slate-200 mb-1">{title}</h4>
      <p className="text-slate-400 leading-snug">{details}</p>
    </div>
  </motion.div>
);

// Sub-component for Inputs
const InputGroup = ({ name, placeholder, type }) => (
  <div className="space-y-2">
    <input 
      type={type} 
      name={name} 
      placeholder={placeholder} 
      required 
      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
    />
  </div>
);

export default ContactSection;