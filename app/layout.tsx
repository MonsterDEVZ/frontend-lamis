import './globals.css'

export const metadata = {
  title: 'LAMIS - Платформа электронной коммерции',
  description: 'Современная платформа электронной коммерции с системой аутентификации',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
