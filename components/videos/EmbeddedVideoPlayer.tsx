'use client';

import YouTube, { YouTubeProps } from 'react-youtube';

interface EmbeddedVideoPlayerProps {
  videoId: string;
  title: string;
}

export default function EmbeddedVideoPlayer({
  videoId,
  title,
}: EmbeddedVideoPlayerProps) {
  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Видео контейнер - масштабируется с правильным aspect ratio */}
      <div className="relative w-full bg-black flex-shrink-0" style={{ paddingBottom: '56.25%' }}>
        <div className="absolute inset-0">
          <YouTube
            videoId={videoId}
            opts={opts}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Заголовок видео */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
}
