import Link from 'next/link';
import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main>
      <HeaderWithSuspense />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        {/* Large semi-transparent "404" */}
        <div className="text-[200px] font-bold text-gray-200 leading-none mb-4">
          404
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Страница не найдена
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          Кажется, что-то пошло не так, или этой страницы больше не существует.
        </p>

        {/* Button to home */}
        <Link href="/">
          <Button variant="primary" size="lg">
            Вернуться на главную
          </Button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
