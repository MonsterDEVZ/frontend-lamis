// app/tutorials/[category]/page.tsx

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/header/Header';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Footer from '@/components/Footer';
import EmbeddedVideoPlayer from '@/components/videos/EmbeddedVideoPlayer';
import { MOCK_TUTORIALS_DATA } from '@/data/mock-tutorials';

interface PageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // --- ИСПРАВЛЕНО: Дожидаемся получения параметров ---
  const resolvedParams = await params;
  const data = MOCK_TUTORIALS_DATA[resolvedParams.category];

  if (!data) {
    return {
      title: 'Категория не найдена | LAMIS',
      description: 'Запрашиваемая категория обучающих видео не найдена',
    };
  }

  return {
    title: `${data.pageTitle} - Обучающие видео | LAMIS`,
    description: `Обучающие видео по теме: ${data.pageTitle}. ${data.videos.length} видео.`,
    keywords: `${data.pageTitle}, обучение, видео, инструкции, LAMIS`,
    openGraph: {
      title: `${data.pageTitle} - Обучающие видео`,
      description: `Обучающие видео по теме: ${data.pageTitle}`,
      url: `https://lamis.ru/tutorials/${resolvedParams.category}`,
      siteName: 'LAMIS',
      type: 'website',
      images: data.pageBannerUrl
        ? [
            {
              url: data.pageBannerUrl,
              width: 1200,
              height: 630,
              alt: data.pageTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.pageTitle} - Обучающие видео`,
      description: `Обучающие видео по теме: ${data.pageTitle}`,
    },
    alternates: {
      canonical: `https://lamis.ru/tutorials/${resolvedParams.category}`,
    },
  };
}

export default async function TutorialsCategoryPage({ params }: PageProps) {
  // --- ИСПРАВЛЕНО: Дожидаемся получения параметров ---
  const resolvedParams = await params;
  const data = MOCK_TUTORIALS_DATA[resolvedParams.category];

  if (!data) {
    notFound();
  }

  return (
    <main>
      <Header />

      <div className="absolute z-10 top-24 md:top-32 w-full">
        <div className="wrapper_centering">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: data.pageTitle },
            ]}
            variant="light"
            resetPosition
            className="px-0!"
          />
        </div>
      </div>

      <div
        className="w-full h-[350px] md:h-[400px] bg-cover bg-center pb-8 sm:pb-16 md:pb-24 flex items-end"
        style={{ backgroundImage: `url('${data.pageBannerUrl}')` }}
      >
        <div className="wrapper_centering px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold">
            {data.pageTitle}
          </h1>
        </div>
      </div>

      <div className="wrapper_centering mt-8 sm:mt-12 md:mt-50 pb-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Обучающие видео</h2>

        {data.videos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Видео не найдены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.videos.map((video) => (
              <EmbeddedVideoPlayer key={video.id} videoId={video.videoId} title={video.title} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}