'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import styles from './ContactSection.module.css';

const ContactSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be added later
    console.log('Form submitted');
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.subtitle}>// GET IN TOUCH</span>
            <h2 className={styles.title}>Let's Build Something <span className={styles.highlight}>Amazing</span></h2>
            <p className={styles.description}>
              Have a project in mind or want to discuss potential opportunities? 
              We'd love to hear from you. Drop us a message and let's create 
              something extraordinary together.
            </p>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <MapPin size={24} />
              </div>
              <div>
                <h4>Our Location</h4>
                <p>123 Innovation Drive, Tech City, TC 10101</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <Mail size={24} />
              </div>
              <div>
                <h4>Email Us</h4>
                <p>contact@velvronlabs.com</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <Phone size={24} />
              </div>
              <div>
                <h4>Call Us</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                required 
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                required 
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <input 
                type="text" 
                name="subject" 
                placeholder="Subject" 
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <textarea 
                name="message" 
                placeholder="Your Message" 
                rows="5" 
                required 
                className={`${styles.formInput} ${styles.textarea}`}
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
              <span>Send Message</span>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
