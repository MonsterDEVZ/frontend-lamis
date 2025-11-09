import './globals.css';
import { Toaster } from 'react-hot-toast';
import ClientInitializer from './ClientInitializer';

export const metadata = {
  title: 'LAMIS - Платформа электронной коммерции',
  description: 'Современная платформа электронной коммерции с системой аутентификации',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
         <ClientInitializer />
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
