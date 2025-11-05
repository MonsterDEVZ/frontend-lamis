import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="flex items-center gap-[50px]">
      <Link
        href="/bathroom-furniture"
        className="text-white hover:opacity-80 transition-opacity whitespace-nowrap text-left"
        style={{ fontSize: '14px', lineHeight: '1.4' }}
      >
        Мебель для<br />ванны Lamis
      </Link>
      <Link
        href="/plumbing-caiser"
        className="text-white hover:opacity-80 transition-opacity whitespace-nowrap text-left"
        style={{ fontSize: '14px', lineHeight: '1.4' }}
      >
        Сантехника<br />Caiser
      </Link>
      <Link
        href="/water-heaters"
        className="text-white hover:opacity-80 transition-opacity whitespace-nowrap text-left"
        style={{ fontSize: '14px', lineHeight: '1.4' }}
      >
        Водонагреватели<br />Blesk
      </Link>
      <Link
        href="/mirrors"
        className="text-white hover:opacity-80 transition-opacity whitespace-nowrap text-left"
        style={{ fontSize: '14px', lineHeight: '1.4' }}
      >
        Дизайнерские<br />зеркала Lamis
      </Link>
    </nav>
  );
}
