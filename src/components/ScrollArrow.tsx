import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollArrowProps {
  targetId?: string;
}

export default function ScrollArrow({ targetId }: ScrollArrowProps) {
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY + windowHeight;
      
      // If we're near the bottom (within 100px), fade out the arrow
      if (scrollTop >= documentHeight - 100) {
        setShouldFadeOut(true);
      } else {
        setShouldFadeOut(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (!targetId) return;
    
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: shouldFadeOut ? 0 : 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.button
        onClick={handleClick}
        className="text-[#FFD97A] hover:text-white transition-colors duration-300"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to next section"
        type="button"
      >
        <ChevronDown size={32} />
      </motion.button>
    </motion.div>
  );
}

