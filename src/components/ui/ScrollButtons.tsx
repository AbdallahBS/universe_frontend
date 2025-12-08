import { ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react';

interface ScrollButtonsProps {
  scrollTarget?: string | number;
  size?: number;
}

const ScrollButtons: React.FC<ScrollButtonsProps> = ({
  scrollTarget = 'bottom',
  size = 45,
}) => {
  const handleScroll = (direction: string) => {
    if (direction === 'bottom') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
    else if (direction === 'top') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    else if (typeof scrollTarget === 'string' && scrollTarget.startsWith('#')) {
      const el = document.querySelector(scrollTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof scrollTarget === 'number') {
      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }
  };

  return (
    <>
      <button
        onClick={() => handleScroll("top")}
        className="
          fixed bottom-20 right-6 sm:right-10 z-50
          flex items-center justify-center 
          rounded-full bg-teal-100 dark:bg-teal-900/80 text-teal-600 dark:text-teal-400
          shadow-lg hover:bg-teal-600 dark:hover:bg-teal-500
          transition-all duration-200 
          hover:scale-110 hover:text-white dark:hover:text-white focus:outline-none
          backdrop-blur-sm border border-teal-200 dark:border-teal-700
        "
        style={{ width: size, height: size, fontSize: size / 2 }}
        aria-label="Scroll to top"
      >
        <ArrowUp />
      </button>

      <button
        onClick={() => handleScroll("bottom")}
        className="
          fixed bottom-5 right-6 sm:right-10 z-50
          flex items-center justify-center 
          rounded-full bg-teal-100 dark:bg-teal-900/80 text-teal-600 dark:text-teal-400
          shadow-lg hover:bg-teal-600 dark:hover:bg-teal-500
          transition-all duration-200 
          hover:scale-110 hover:text-white dark:hover:text-white focus:outline-none
          backdrop-blur-sm border border-teal-200 dark:border-teal-700
        "
        style={{ width: size, height: size, fontSize: size / 2 }}
        aria-label="Scroll to bottom"
      >
        <ArrowDown />
      </button>
    </>
  );
};

export default ScrollButtons;
