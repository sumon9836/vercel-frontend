'use client'
import '../styles/globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/pair', label: 'Pair Device', icon: '📱' },
    { href: '/logout', label: 'Logout User', icon: '🚪' }
  ];

  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="glass-header p-6 text-white">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 text-gradient">
              🤖 WhatsApp Bot Dashboard
            </h1>
            <nav className="flex justify-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-button ${
                    pathname === item.href ? 'nav-button-active' : ''
                  }`}
                >
                  <span className="text-lg mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-6 min-h-screen">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
        <footer className="glass-footer p-4 text-center text-white mt-auto">
          <p className="text-sm opacity-80">
            © 2024 WhatsApp Bot Dashboard - Powered by Next.js
          </p>
        </footer>
      </body>
    </html>
  )
}