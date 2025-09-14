import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Aishot - Website Screenshot Tool",
  description: "Take beautiful website screenshots across devices with Aishot",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="w-full border-b bg-white dark:bg-gray-800 shadow-sm">
          <div className="container flex items-center justify-between py-4">
            <h1 className="text-xl font-bold text-blue-600">Aishot</h1>
            <nav className="space-x-4">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a
                href="https://github.com/Takawell"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="w-full border-t bg-white dark:bg-gray-800 mt-10">
          <div className="container py-6 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Aishot. Built with Next.js 14.
          </div>
        </footer>
      </body>
    </html>
  );
}
