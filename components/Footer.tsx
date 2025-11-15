// Путь к файлу: components/Footer.js (или где он у вас лежит)
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Send, Youtube } from 'lucide-react';
import AccordionItem from './AccordionItem'; // Убедитесь, что путь к AccordionItem.js верный

interface Tutorial {
  id: number;
  title: string;
  slug: string;
}

// Статические секции footer
const staticFooterSections = [
  {
    title: 'Продукция',
    links: [
      { title: 'Мебель для ванной', href: '/bathroom-furniture-lamis' },
      { title: 'Санфарфор', href: '/sanfarfor' },
      { title: 'Смесители', href: '/faucets' },
      { title: 'Инсталяции', href: '/installations' },
      { title: 'Водонагреватели (электрические)', href: '/water-heaters' },
      { title: 'Дизайнерские и умные зеркала', href: '/smart-mirrors' },
      { title: 'Каталоги', href: '/catalogs' },
      { title: 'Сертификаты качества', href: '/certificates' },
    ],
  },
  {
    title: 'Информация',
    links: [
      { title: 'О нас', href: '/about' },
      { title: 'Где купить', href: '/contacts' },
      { title: 'Сервисный центр', href: '/service-center' },
      { title: 'Станьте нашим партнером', href: '/partnership' },
      { title: 'Материалы', href: '/downloads' },
    ],
  },
];

export default function Footer() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loadingTutorials, setLoadingTutorials] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setLoadingTutorials(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tutorials/`
        );

        if (response.ok) {
          const data = await response.json();
          // API возвращает { count, results } - берем массив results
          setTutorials(Array.isArray(data) ? data : (data.results || []));
        } else {
          // Если ошибка - показать пустой массив
          setTutorials([]);
        }
      } catch (error) {
        console.error('Error fetching tutorials:', error);
        // Если ошибка - показать пустой массив
        setTutorials([]);
      } finally {
        setLoadingTutorials(false);
      }
    };

    fetchTutorials();
  }, []);

  return (
    <footer className="bg-black text-white">
      {/* Основной контент футера */}
      <div className="wrapper_centering py-16!">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Логотип и социальные сети */}
          <div className="mt-2">
            <Link href="/" className="inline-block mb-6">
              <Image src="/logo.svg" alt="LAMIS" width={156} height={32} priority />
            </Link>

            <div className="flex gap-3 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2D3748] hover:opacity-80 transition-opacity"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2D3748] hover:opacity-80 transition-opacity"
              >
                <Send size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2D3748] hover:opacity-80 transition-opacity"
              >
                <Youtube size={20} />
              </a>
            </div>

            <a
              href="mailto:info@lamis.kg"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              info@lamis.kg
            </a>
          </div>

          {/* Статические секции */}
          {staticFooterSections.map((section) => (
            <div key={section.title}>
              {/* ВЕРСИЯ ДЛЯ ДЕСКТОПА (видна на экранах md и больше) */}
              <div className="hidden md:block">
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/80 hover:text-white transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ВЕРСИЯ ДЛЯ МОБИЛЬНЫХ (видна на экранах меньше md) */}
              <div className="block md:hidden">
                <AccordionItem title={section.title}>
                  <ul className="space-y-4 mt-5">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/80 hover:text-white transition-colors"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              </div>
            </div>
          ))}

          {/* ПРОФЕССИОНАЛАМ СЕКЦИЯ - Динамическая загрузка */}
          <div>
            {/* ВЕРСИЯ ДЛЯ ДЕСКТОПА */}
            <div className="hidden md:block">
              <h3 className="text-lg font-semibold mb-4">Профессионалам</h3>

              {/* Loading скелетон */}
              {loadingTutorials ? (
                <ul className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i} className="h-5 bg-white/10 rounded animate-pulse w-48"></li>
                  ))}
                </ul>
              ) : (
                /* Список ссылок */
                <ul className="space-y-2">
                  {tutorials.map((tutorial) => (
                    <li key={tutorial.id}>
                      <Link
                        href={`/tutorials/${tutorial.slug}`}
                        className="text-sm text-white/80 hover:text-white transition-colors"
                      >
                        {tutorial.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ВЕРСИЯ ДЛЯ МОБИЛЬНЫХ */}
            <div className="block md:hidden">
              <AccordionItem title="Профессионалам">
                {loadingTutorials ? (
                  <ul className="space-y-4 mt-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <li key={i} className="h-5 bg-white/10 rounded animate-pulse w-48"></li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-4 mt-5">
                    {tutorials.map((tutorial) => (
                      <li key={tutorial.id}>
                        <Link
                          href={`/tutorials/${tutorial.slug}`}
                          className="text-sm text-white/80 hover:text-white transition-colors"
                        >
                          {tutorial.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="border-t border-white/10">
        <div className="wrapper_centering py-6!">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>Copyright 2025. LAMIS</p>
            <div className="flex gap-6">
              <Link href="/cookie-policy" className="hover:text-white transition-colors">
                Политика использования файлов Cookie
              </Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
          <p className="text-xs text-white/40 mt-4 text-center">
            Производитель оставляет за собой право в любой момент вносить изменения в комплектацию,
            дизайн и характеристики товара, не ухудшающие его качество. Актуальная информация о
            продукции LAMIS — на сайте бренда lamis.kg
          </p>
        </div>
      </div>
    </footer>
  );
}
