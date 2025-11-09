// Путь: app/layout.tsx

import './globals.css';
<<<<<<< HEAD
import ClientLayoutWrapper from './ClientLayoutWrapper'; // <-- Импортируем нашу обертку
=======
import { Toaster } from 'react-hot-toast';
import ClientInitializer from './ClientInitializer';
>>>>>>> 602a169b45dbc620399d7bdc7e5dc4a7c9335b86

export const metadata = {
  title: 'LAMIS - Платформа электронной коммерции',
  description: 'Современная платформа электронной коммерции с системой аутентификации',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
<<<<<<< HEAD
        {/* Оборачиваем дочерние элементы в наш клиентский компонент */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
=======
         <ClientInitializer />
        <Toaster position="top-right" />
        {children}
>>>>>>> 602a169b45dbc620399d7bdc7e5dc4a7c9335b86
      </body>
    </html>
  );
}