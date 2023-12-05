import './globals.css';

import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ParleyPoint',
  description: 'Une application de discussion en temps réel',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="fr">
      <body className={`${inter.className} h-full`}>
        <div className="bg-slate-300">
          <nav className="bg-white p-6">
            <div className="container mx-auto">
              <Link href="/">
                <h1 className="font-bold text-xl cursor-pointer">ParleyPoint</h1>
              </Link>
            </div>
          </nav>
          <main className="container mx-auto p-2.5">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}