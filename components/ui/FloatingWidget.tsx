'use client';
import { useState, useEffect, type FC } from 'react';
import { FaWhatsapp, FaCommentDots, FaChevronDown } from 'react-icons/fa';

interface IProps {
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

const FloatingWidget: FC<IProps> = ({ onOpenChat }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Используем lg (1024px) как точку переключения, а не 768px
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSubButtonClick = (button: (typeof actionButtons)[0]) => {
    setIsOpen(false);

    if (button.url) {
      window.open(button.url, '_blank');
    } else if (button.name === 'Chat') {
      onOpenChat();
    }
  };

  return (
    <div className="fixed right-4 z-50 flex items-end gap-3 bottom-15 lg:right-5 lg:gap-4 lg:bottom-20">
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-11 right-0 flex flex-col items-center gap-2 lg:bottom-[60px] lg:gap-3">
            {actionButtons.map((item) => (
              <button
                key={item.name}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-green-100 text-white shadow-lg transition-colors duration-200 hover:bg-green-700 lg:h-50 lg:w-50"
                onClick={() => handleSubButtonClick(item)}
              >
                <item.icon size={isMobile ? 18 : 24} />
              </button>
            ))}
          </div>
        )}

        <button
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-green-100 text-white shadow-xl transition-colors duration-300 hover:bg-green-700 lg:h-50 lg:w-50"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <FaChevronDown size={isMobile ? 20 : 26} className="rotate-180" />
          ) : (
            <FaWhatsapp size={isMobile ? 20 : 26} />
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingWidget;
