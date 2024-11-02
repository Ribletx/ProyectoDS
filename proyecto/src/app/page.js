import Link from "next/link";
import Header from './components/header';
import Footer from './components/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8">
        <div className="bg-gray-700 bg-opacity-60 p-8 rounded-lg shadow-xl text-center w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Página Principal</h1>
          <p className="text-gray-300 text-lg mb-6">
            Bienvenido a nuestra plataforma {process.env.name || "Usuario"}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-semibold text-center transition transform hover:scale-105 shadow-md">
              Sign In
            </Link>
            <Link href="/register" className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-lg font-semibold text-center transition transform hover:scale-105 shadow-md">
              Register
            </Link>
          </div>
          <div className="mt-6">
            <Link href="/snake">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md">
                Jugar Snake
              </button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
