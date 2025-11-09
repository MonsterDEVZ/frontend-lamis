// Путь: app/layout.tsx

import './globals.css';
import ClientLayoutWrapper from './ClientLayoutWrapper'; // <-- Импортируем нашу обертку

export const metadata = {
  title: 'LAMIS - Платформа электронной коммерции',
  description: 'Современная платформа электронной коммерции с системой аутентификации',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {/* Оборачиваем дочерние элементы в наш клиентский компонент */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}