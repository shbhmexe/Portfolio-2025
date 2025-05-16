'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";
import { styles } from "../constants/styles";
import SectionWrapper from "./SectionWrapper";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactInfo = ({ icon, text }: { icon: React.ReactNode, text: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: {
        duration: 0.2
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("exit");
    }
  }, [isInView, controls]);

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="flex items-center gap-4 motion-section"
    >
      <span className="text-2xl text-[#915EFF]">{icon}</span>
      <p className="text-white font-medium">{text}</p>
    </motion.div>
  );
};

const FormField = ({ label, name, type, value, onChange, placeholder, required }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0, 
      y: 30,
      transition: {
        duration: 0.25
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("exit");
    }
  }, [isInView, controls]);

  return (
    <motion.label 
      className="flex flex-col motion-section"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <span className="text-white font-medium mb-3 sm:mb-4">{label}</span>
      {type === 'textarea' ? (
        <textarea
          rows={5}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium resize-none"
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
          required={required}
        />
      )}
    </motion.label>
  );
};

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

  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const titleControls = useAnimation();

  const mapRef = useRef(null);
  const mapInView = useInView(mapRef, { once: false, amount: 0.3 });
  const mapControls = useAnimation();

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      x: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  useEffect(() => {
    if (titleInView) {
      titleControls.start("visible");
    } else {
      titleControls.start("exit");
    }
  }, [titleInView, titleControls]);

  useEffect(() => {
    if (mapInView) {
      mapControls.start("visible");
    } else {
      mapControls.start("exit");
    }
  }, [mapInView, mapControls]);

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
    } catch (error: any) {
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
      <div className="flex-[0.75] bg-black-100 p-4 sm:p-8 rounded-2xl contact-form-container">
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={titleVariants}
          className="motion-section"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>
        </motion.div>

        <div className="flex flex-col gap-6 mb-8 sm:mb-12">
          <ContactInfo icon={<FaEnvelope />} text="shubhushukla586@gmail.com" />
          <ContactInfo icon={<FaPhone />} text="80766***12" />
          <ContactInfo icon={<FaMapMarkerAlt />} text="New Delhi, India" />
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
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 sm:mt-12 flex flex-col gap-6 sm:gap-8"
        >
          <FormField
            label="Your Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="What's your name?"
            required={true}
          />
          
          <FormField
            label="Your Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email?"
            required={true}
          />
          
          <FormField
            label="Your Phone (Optional)"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            required={false}
          />
          
          <FormField
            label="Your Message"
            name="message"
            type="textarea"
            value={form.message}
            onChange={handleChange}
            placeholder="What do you want to say?"
            required={true}
          />

          <motion.div
            ref={useRef(null)}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  damping: 10,
                  stiffness: 200,
                  duration: 0.3
                }
              }
            }}
            className="motion-section relative z-10"
          >
            <button
              type="submit"
              className={`py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md ${
                loading 
                  ? 'bg-gray-600' 
                  : 'bg-[#915EFF] hover:bg-[#7b4fd8] transition-colors'
              } mt-2`}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.div>
        </form>
      </div>

      <motion.div
        ref={mapRef}
        initial="hidden"
        animate={mapControls}
        variants={mapVariants}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] motion-section"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192866!2d77.06889754864501!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1623329164628!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-2xl"
        ></iframe>
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