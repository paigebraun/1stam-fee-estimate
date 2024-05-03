import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronUp } from 'react-icons/fi';

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      className="fixed bottom-10 right-10 bg-gray-300 hover:bg-gray-300 text-gray-700 rounded-full p-3 focus:outline-none z-10 drop-shadow-md"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
    >
      <FiChevronUp className="w-6 h-6" />
    </motion.button>
  );
};

export default ScrollToTopButton;