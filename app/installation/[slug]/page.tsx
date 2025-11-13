// Путь: app/installation/[slug]/page.tsx

import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import SectionHeading from '@/components/SectionHeading'; // Предполагаю, у вас есть такой компонент

// --- БАЗА ДАННЫХ ВИДЕО ---
// Вся информация о видео хранится здесь.
// Вы легко можете добавлять новые видео или категории.
const videoData = {
  furniture: {
    title: 'Установка мебели',
    videos: [
      {
        title: 'Сборка и установка тумбы под раковину Lamis',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Замените на реальную ссылку
        thumbnailUrl: '/images/video-thumbs/thumb1.jpg', // Замените на реальную картинку
        duration: '12:34',
      },
      {
        title: 'Как правильно повесить зеркальный шкаф: советы профессионалов',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: '/images/video-thumbs/thumb2.jpg',
        duration: '08:15',
      },
      // ... добавьте сюда больше видео по установке мебели
    ],
  },
  sink: {
    title: 'Установка раковины',
    videos: [
      {
        title: 'Монтаж накладной раковины на столешницу',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: '/images/video-thumbs/thumb3.jpg',
        duration: '15:02',
      },
      // ...
    ],
  },
  bath: {
    title: 'Установка ванн',
    videos: [ /* ... */ ],
  },
  faucet: {
    title: 'Установка смесителей',
    videos: [ /* ... */ ],
  },
  'water-heater': {
    title: 'Установка водонагревателей',
    videos: [ /* ... */ ],
  },
};

// --- КОМПОНЕНТ СТРАНИЦЫ ---
export default function InstallationPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = videoData[slug as keyof typeof videoData];

  // Если такой категории нет, можно показать страницу 404 или сообщение
  if (!category) {
    return (
      <main>
        <Header />
        <div className="bg-white pt-32 pb-20">
          <div className="wrapper_centering">
            <SectionHeading>Категория не найдена</SectionHeading>
            <p>Видео-уроки по данной теме отсутствуют.</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <div className="bg-white pt-32 pb-20">
        <div className="wrapper_centering">
          <SectionHeading>{category.title}</SectionHeading>

          {/* Сетка с видео-карточками */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.videos.map((video, index) => (
              <VideoCard
                key={index}
                title={video.title}
                youtubeUrl={video.youtubeUrl}
                thumbnailUrl={video.thumbnailUrl}
                duration={video.duration}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}