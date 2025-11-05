import Link from 'next/link';
import { cn } from '@/styles';

interface NavProps {
  isDarkText?: boolean;
}

export default function Nav({ isDarkText = false }: NavProps) {
  const linkClass = cn(
    "hover:opacity-80 transition-opacity whitespace-nowrap text-left",
    isDarkText ? "text-gray-900 hover:text-gray-700" : "text-white"
  );

  return (
    <nav className="flex items-center gap-[50px]">
      <Link
        href="/bathroom-furniture-lamis"
        className={linkClass}
        style={{ fontSize: '14px', lineHeight: '1.4' }}
      >
        Мебель для
        <br />
        ванны Lamis
      </Link>
      <Link
        href="/plumbing-caiser"
        className={linkClass}
        style={{ fontSize: '14px', lineHeight: '1.4' }}
      >
        Сантехника
        <br />
        Caiser
      </Link>
      <Link
        href="/water-heaters"
        className={linkClass}
        style={{ fontSize: '14px', lineHeight: '1.4' }}
      >
        Водонагреватели
        <br />
        Blesk
      </Link>
      <Link
        href="/mirrors"
        className={linkClass}
        style={{ fontSize: '14px', lineHeight: '1.4' }}
      >
        Дизайнерские
        <br />
        зеркала Lamis
      </Link>
    </nav>
  );
}
