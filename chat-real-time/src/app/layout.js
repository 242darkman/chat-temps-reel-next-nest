import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ParleyPoint',
  description: 'Une application de discussion en temps réel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white p-6">
            <div className="container mx-auto">
              <h1 className="font-bold text-xl">ParleyPoint</h1>
            </div>
          </nav>
          <main className="container mx-auto p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}