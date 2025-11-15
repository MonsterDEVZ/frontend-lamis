'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Footer from '@/components/Footer';
import VideoCard from '@/components/videos/VideoCard';

interface Video {
  id: number;
  title: string;
  videoId: string;
}

interface Tutorial {
  id: number;
  title: string;
  slug: string;
  pageTitle: string;
  pageBannerUrl: string;
  videos: Video[];
}

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function TutorialsCategoryPage({ params }: PageProps) {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    // Получить category из params
    params.then((resolvedParams) => {
      setCategory(resolvedParams.category);
      fetchTutorial(resolvedParams.category);
    });
  }, [params]);

  const fetchTutorial = async (categorySlug: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutorials/${categorySlug}/`
      );

      if (!response.ok) {
        throw new Error('Tutorial not found');
      }

      const data = await response.json();
      setTutorial(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tutorial:', err);
      setError('Видео не найдено');
    } finally {
      setLoading(false);
    }
  };

  // Loading состояние
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <HeaderWithSuspense />
        <div className="flex items-center justify-center h-[600px]">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 text-lg">Загрузка видео...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Ошибка или не найдено
  if (error || !tutorial) {
    return notFound();
  }

  return (
    <main className="bg-gray-50">
      <HeaderWithSuspense />

      {/* Breadcrumbs - поверх Hero */}
      <div className="absolute z-10 top-24 md:top-32 w-full">
        <div className="wrapper_centering">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: tutorial.pageTitle },
            ]}
            variant="light"
            resetPosition
            className="px-0!"
          />
        </div>
      </div>

      {/* HERO SECTION с overlay и центрированным текстом */}
      <section
        className="relative w-full min-h-[400px] md:min-h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('${tutorial.pageBannerUrl}')` }}
      >
        {/* Dark Overlay для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />

        {/* Hero Content */}
        <div className="relative z-10 wrapper_centering px-4 text-center py-20 md:py-24">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {tutorial.pageTitle}
          </h1>
          <p className="text-white/95 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Обучающие видео по установке и монтажу
          </p>
          <p className="text-white/80 text-sm md:text-base mt-2">
            {tutorial.videos.length} видео{tutorial.videos.length > 1 ? '' : ''}
          </p>
        </div>
      </section>

      {/* VIDEOS GRID - 3 КОЛОНКИ */}
      <section className="wrapper_centering mt-12 md:mt-16 pb-16 px-4">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Видео уроки
          </h2>
          <p className="text-gray-600 text-lg">
            Пошаговые инструкции для профессионального монтажа
          </p>
        </div>

        {tutorial.videos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Видео не найдены</p>
          </div>
        ) : (
          /* GRID 3 КОЛОНКИ */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {tutorial.videos.map((video) => (
              <VideoCard
                key={video.id}
                videoId={video.videoId}
                title={video.title}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
