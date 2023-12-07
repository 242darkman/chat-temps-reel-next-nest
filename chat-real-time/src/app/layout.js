import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import { UserProvider } from './(context)/UserContext.js';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ParleyPoint',
  description: 'Une application de discussion en temps réel',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-slate-300 `}>
        <div className='h-screen flex flex-col'>
            <nav className="bg-white p-6">
                <Link href="/">
                  <div className="container mx-auto">
                      <h1 className="font-bold text-xl cursor-pointer">ParleyPoint</h1>
                  </div>
                </Link>
            </nav>
            <main className="container mx-auto p-1 flex-grow flex items-center">
            <UserProvider>
              {children}
            </UserProvider>
          </main>
          </div>
        </body>
      </html>
  )
}