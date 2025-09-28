'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Brain, 
  Shield, 
  Cloud, 
  Database,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import styles from './ServicesSection.module.css';

const services = [
  {
    id: 1,
    icon: <Code size={32} />,
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
    features: ['React/Next.js', 'TypeScript', 'Responsive Design', 'Performance Optimization'],
    color: '#3b82f6'
  },
  {
    id: 2,
    icon: <Smartphone size={32} />,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Deployment'],
    color: '#8b5cf6'
  },
  {
    id: 3,
    icon: <Brain size={32} />,
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions powered by artificial intelligence and machine learning.',
    features: ['Custom AI Models', 'Data Analysis', 'Automation', 'Predictive Analytics'],
    color: '#ec4899'
  },
  {
    id: 4,
    icon: <Cloud size={32} />,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment solutions for modern applications.',
    features: ['AWS/Azure/GCP', 'DevOps', 'Microservices', 'Auto-scaling'],
    color: '#10b981'
  },
  {
    id: 5,
    icon: <Database size={32} />,
    title: 'Blockchain Development',
    description: 'Decentralized applications and smart contracts on various blockchain platforms.',
    features: ['Smart Contracts', 'DeFi Solutions', 'NFT Platforms', 'Web3 Integration'],
    color: '#f59e0b'
  },
  {
    id: 6,
    icon: <Shield size={32} />,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets and infrastructure.',
    features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Risk Assessment'],
    color: '#ef4444'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.subtitle}>// OUR SERVICES</span>
          <h2 className={styles.title}>
            What We <span className={styles.highlight}>Build</span>
          </h2>
          <p className={styles.description}>
            From concept to deployment, we deliver comprehensive technology solutions 
            that drive innovation and accelerate your business growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div 
                className={styles.serviceIcon}
                style={{ color: service.color }}
              >
                {service.icon}
              </div>
              
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              
              <ul className={styles.featureList}>
                {service.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <CheckCircle size={16} className={styles.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button 
                className={styles.serviceButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Learn More</span>
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className={styles.ctaTitle}>Ready to Start Your Project?</h3>
          <p className={styles.ctaDescription}>
            Let's discuss how we can bring your vision to life with our expertise and innovation.
          </p>
          <motion.button 
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
