import React from 'react';

interface YandexMapEmbedProps {
  mapUrl: string;
}

const YandexMapEmbed: React.FC<YandexMapEmbedProps> = ({ mapUrl }) => {
  return (
    <iframe
      src={mapUrl}
      width="100%"
      height="400"
      frameBorder="0"
      style={{ border: 0, borderRadius: '16px' }}
      allowFullScreen={true}
    ></iframe>
  );
};

export default YandexMapEmbed;
