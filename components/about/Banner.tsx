import React from 'react';

const Banner: React.FC = () => {
  return (
    <div
      className="w-full h-[400px] bg-cover bg-center py-24"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
    </div>
  );
};

export default Banner;
