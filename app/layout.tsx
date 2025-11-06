import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'LAMIS - Платформа электронной коммерции',
  description: 'Современная платформа электронной коммерции с системой аутентификации',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
