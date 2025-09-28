'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Twitter, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.topSection}>
          <div className={styles.brandInfo}>
            <h3 className={styles.brandName}>Velvron Labs</h3>
            <p className={styles.tagline}>Engineering the future, one line of code at a time.</p>
            <div className={styles.socialLinks}>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>Services</h4>
              <ul>
                <li><Link href="/services/web-development">Web Development</Link></li>
                <li><Link href="/services/mobile-apps">Mobile Apps</Link></li>
                <li><Link href="/services/ai-ml">AI & ML</Link></li>
                <li><Link href="/services/blockchain">Blockchain</Link></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>Legal</h4>
              <ul>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service">Terms of Service</Link></li>
                <li><Link href="/cookies">Cookie Policy</Link></li>
                <li><Link href="/gdpr">GDPR</Link></li>
              </ul>
            </div>

            <div className={styles.contactInfo}>
              <h4 className={styles.linkGroupTitle}>Contact</h4>
              <ul>
                <li>
                  <MapPin size={16} />
                  <span>123 Innovation Drive, Tech City, TC 10101</span>
                </li>
                <li>
                  <Mail size={16} />
                  <a href="mailto:contact@velvronlabs.com">contact@velvronlabs.com</a>
                </li>
                <li>
                  <Phone size={16} />
                  <a href="tel:+15551234567">+1 (555) 123-4567</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1644262070010!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {currentYear} Velvron Labs. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span className={styles.divider}>•</span>
            <Link href="/terms-of-service">Terms of Service</Link>
            <span className={styles.divider}>•</span>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
