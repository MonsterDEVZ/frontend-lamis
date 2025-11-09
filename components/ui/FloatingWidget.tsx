'use client';

import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaWhatsapp, FaCommentDots, FaPhoneAlt, FaChevronDown } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';

interface FloatingWidgetProps {
  onOpenChat: () => void;
}

// --- КОНФИГУРАЦИЯ ---
const actionButtons = [
  {
    icon: FaWhatsapp,
    name: 'WhatsApp',
    url: 'https://wa.me/ВАШ_НОМЕР_WHATSAPP?text=Здравствуйте, пишу с сайта LAMIS',
  },
  { icon: FaCommentDots, name: 'Chat' },
  /* // Телефон закомментирован
  {
    icon: FaPhoneAlt,
    name: "Call",
    url: "tel:ВАШ_НОМЕР_ТЕЛЕФОНА",
  },
  */
];

const mainIcons = [FaWhatsapp, FiMessageSquare];
const tooltipMessages = [
  'Есть вопросы? Напишите нам!',
  'Мы онлайн в WhatsApp',
  // "Оставьте заявку, мы перезвоним",
  'Нужна консультация?',
];

const FloatingWidget: FC<FloatingWidgetProps> = ({ onOpenChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [playWave, setPlayWave] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [currentTooltipIndex, setCurrentTooltipIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Используем lg (1024px) как точку переключения, а не 768px
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tooltipClosed = localStorage.getItem('lamis_tooltip_closed');
      if (tooltipClosed !== 'true') {
        const timer = setTimeout(() => {
          if (!isOpen) setIsTooltipVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % mainIcons.length);
      setPlayWave(true);
    }, 3000);
    const tooltipInterval = setInterval(() => {
      setCurrentTooltipIndex((prev) => (prev + 1) % tooltipMessages.length);
    }, 3000);
    return () => {
      clearInterval(iconInterval);
      clearInterval(tooltipInterval);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isTooltipVisible) setIsTooltipVisible(false);
  };

  const handleSubButtonClick = (button: (typeof actionButtons)[0]) => {
    setIsOpen(false);
    if (button.url) {
      window.open(button.url, '_blank');
    } else if (button.name === 'Chat') {
      onOpenChat();
      if (isTooltipVisible) setIsTooltipVisible(false);
    }
  };

  const handleCloseTooltip = () => {
    setIsTooltipVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lamis_tooltip_closed', 'true');
    }
  };

  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, when: 'afterChildren' },
    },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, staggerDirection: 1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'tween', ease: 'easeOut', duration: 0.25 } },
  };

  const MainIcon = mainIcons[currentIcon];

  return (
    <div className="fixed right-4 z-50 flex items-end gap-3 bottom-15 lg:right-5 lg:gap-4 lg:bottom-20">
      <AnimatePresence>
        {!isMobile && isTooltipVisible && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative h-[54px] max-w-[280px] min-w-[240px] overflow-hidden rounded-2xl bg-white px-5 py-3 shadow-lg"
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTooltipIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <p className="text-center text-sm font-bold leading-tight text-gray-800">
                    {tooltipMessages[currentTooltipIndex]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={handleCloseTooltip}
              className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-100"
              aria-label="Close tooltip"
            >
              <svg
                className="h-3 w-3 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="absolute -right-2 top-1/2 h-0 w-0 -translate-y-1/2 border-y-8 border-l-8 border-y-transparent border-l-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-11 right-0 flex flex-col items-center gap-2 lg:bottom-13 lg:gap-3"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {actionButtons.map((item) => (
                <motion.button
                  key={item.name}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-green-100 text-white shadow-lg transition-colors duration-200 hover:bg-green-700 lg:h-[40px] lg:w-[40px]"
                  onClick={() => handleSubButtonClick(item)}
                  variants={itemVariants}
                >
                  <item.icon size={isMobile ? 18 : 20} />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-green-100 text-white shadow-xl transition-colors duration-300 hover:bg-green-700 lg:h-[40px] lg:w-[40px]"
          onClick={toggleMenu}
        >
          {playWave && <div className="wave" onAnimationEnd={() => setPlayWave(false)} />}
          {!isOpen && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIcon}
                className="absolute flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <MainIcon size={isMobile ? 16 : 18} />
              </motion.div>
            </AnimatePresence>
          )}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute flex items-center justify-center"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown size={isMobile ? 18 : 20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

export default FloatingWidget;
