import { ArrowDown } from 'lucide-react';
import React from 'react';

interface ScrollDownButtonProps {
  scrollTarget?: string | number;
  size?: number;
}

const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({
  scrollTarget = 'bottom',
  size = 45,
}) => {
  const handleScroll = () => {
    if (scrollTarget === 'bottom') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else if (typeof scrollTarget === 'string' && scrollTarget.startsWith('#')) {
      const el = document.querySelector(scrollTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof scrollTarget === 'number') {
      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="
        fixed bottom-5 right-10
        flex items-center justify-center 
        rounded-full bg-teal-100 text-teal-600
        shadow-lg hover:bg-teal-600 
        transition-transform duration-200 
        hover:scale-110 hover:text-white focus:outline-none
      "
      style={{ width: size, height: size, fontSize: size / 2 }}
      aria-label="Scroll down"
    >
      <ArrowDown />
    </button>
  );
};

export default ScrollDownButton;
