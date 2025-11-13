'use client';

import YouTube, { YouTubeProps } from 'react-youtube';

interface EmbeddedVideoPlayerProps {
  videoId: string;
  title: string;
}

export default function EmbeddedVideoPlayer({ videoId, title }: EmbeddedVideoPlayerProps) {
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
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full aspect-video">
        <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 leading-tight line-clamp-2">{title}</h3>
      </div>
    </div>
  );
}
