'use client';
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { styles } from "../constants/styles";
import SectionWrapper from "./SectionWrapper";
import { slideIn } from "./utils/motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
    visible: boolean;
    emailStatus?: any;
  } | null>(null);

  // This effect ensures toast notifications appear even if server is reloaded
  useEffect(() => {
    // Show toast notification if status exists and is visible
    if (submitStatus?.visible) {
      if (submitStatus.success) {
        toast.success('Message sent successfully!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        toast.error(submitStatus.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    }
  }, [submitStatus?.visible, submitStatus?.success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear status message when user starts typing again
    if (submitStatus?.visible) {
      setSubmitStatus(prev => prev ? {...prev, visible: false} : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      // Use a full URL with a fallback to relative path
      // This ensures it works both locally and when deployed
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : '';
      
      console.log('Sending request to:', `${baseUrl}/api/contact`);
      
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
        // Add cache and credentials options
        cache: 'no-cache',
        credentials: 'same-origin'
      });

      console.log('Response status:', response.status);

      // If response is not OK, throw an error with status
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response data:', result);

      if (result.success) {
        // Always show a simple success message
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! I will get back to you soon.',
          visible: true,
          emailStatus: null // Don't store email status
        });

        // Reset form on success
        setForm({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        // Show error message on form
        setSubmitStatus({
          success: false,
          message: result.message || 'Something went wrong. Please try again.',
          visible: true
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      // Show detailed network error message
      setSubmitStatus({
        success: false,
        message: `Network error: ${error.message || 'Please check your connection and try again.'}`,
        visible: true
      });
    } finally {
      setLoading(false);
      
      // Scroll to the status message for better visibility
      setTimeout(() => {
        const statusElement = document.getElementById('status-message');
        if (statusElement) {
          statusElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-4 sm:p-8 rounded-2xl contact-form-container"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <div className="flex flex-col gap-6 mb-8 sm:mb-12">
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-2xl text-[#915EFF]" />
            <p className="text-white font-medium">shubhushukla586@gmail.com</p>
          </div>
          <div className="flex items-center gap-4">
            <FaPhone className="text-2xl text-[#915EFF]" />
            <p className="text-white font-medium">80766***12</p>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-2xl text-[#915EFF]" />
            <p className="text-white font-medium">New Delhi, India</p>
          </div>
        </div>

        {/* Status message with ID for scrolling - simplified version */}
        {submitStatus?.visible && (
          <div 
            id="status-message"
            className={`mb-6 p-4 rounded-lg flex items-start ${
              submitStatus.success 
                ? 'bg-green-900 bg-opacity-20 text-green-300 border border-green-500' 
                : 'bg-red-900 bg-opacity-20 text-red-300 border border-red-500'
            }`}
          >
            {submitStatus.success 
              ? <FaCheckCircle className="mr-3 text-green-400 flex-shrink-0 mt-1" /> 
              : <FaExclamationCircle className="mr-3 text-red-400 flex-shrink-0 mt-1" />
            }
            <div>
              <p className="font-medium">{submitStatus.message}</p>
              {/* Removed the second message about email notification issues */}
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 sm:mt-12 flex flex-col gap-6 sm:gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-3 sm:mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-3 sm:mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-3 sm:mb-4">Your Phone (Optional)</span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-3 sm:mb-4">Your Message</span>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium resize-none"
              required
            />
          </label>

          <button
            type="submit"
            className={`py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md ${
              loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-tertiary shadow-primary hover:bg-[#915EFF] transition-colors'
            } mt-2`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[300px]"
      >
        <div className="h-full bg-tertiary rounded-2xl overflow-hidden flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83922661547!2d77.04417777469498!3d28.527252738388286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1698432603736!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>

      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ 
          width: 'auto', 
          maxWidth: '90%',
          bottom: '20px',
          zIndex: 9999 
        }}
      />
    </div>
  );
};

export default SectionWrapper(Contact, "contact"); 