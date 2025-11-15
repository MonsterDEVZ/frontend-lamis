// components/CookieConsentBanner.tsx

'use client'; // Это КЛИЕНТСКИЙ компонент, так как он использует localStorage и useState

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Импортируем Link для навигации

// Ключ, по которому мы будем хранить согласие в localStorage.
const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';

export default function CookieConsentBanner() {
  // Состояние, которое отвечает за видимость баннера.
  const [isVisible, setIsVisible] = useState(false);

  // Этот код выполнится только один раз на стороне клиента, когда компонент загрузится.
  useEffect(() => {
    const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  // Функция, которая вызывается при нажатии на кнопку "Согласен".
  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  // Если баннер не должен быть виден, ничего не рендерим.
  if (!isVisible) {
    return null;
  }

  // JSX-разметка самого баннера с новыми стилями и текстом.
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white text-gray-800 p-4 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="wrapper_centering flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Блок с текстом */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider">
            О ФАЙЛАХ COOKIE НА САЙТЕ LAMIS
          </h3>
          <p className="text-xs text-gray-600">
            На нашем сайте используются{' '}
            <Link href="/cookie-policy" className="text-green-600 hover:underline">
              файлы cookie
            </Link>{' '}
            и другие технологии, которые позволяют нам и нашим партнерам идентифицировать вас, а
            также изучать, как вы используете веб-сайт. Дальнейшее использование этого сайта
            подразумевает ваше согласие на использование этих технологий, а также с{' '}
            <Link href="/privacy-policy" className="text-green-600 hover:underline">
              политикой конфиденциальности
            </Link>
            .
          </p>
        </div>

        {/* Кнопка */}
        <button
          onClick={handleAccept}
          className="inline-flex items-center justify-center h-12 min-h-12 px-6 bg-[#009B3E] border border-[#009B3E] rounded-full cursor-pointer text-white font-medium text-base leading-6 whitespace-nowrap transition-all duration-300 ease-in-out hover:bg-[#008234]"
        >
          Согласен
        </button>
      </div>
    </div>
  );
}
