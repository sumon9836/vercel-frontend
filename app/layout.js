import './globals.css'

export const metadata = {
  title: 'WhatsApp Bot Dashboard',
  description: 'Manage WhatsApp bot sessions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 text-center text-xl font-bold text-white bg-[var(--pink-strong)]">
          WhatsApp Bot Dashboard
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}