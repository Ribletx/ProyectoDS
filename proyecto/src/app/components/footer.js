import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-6 flex flex-col items-center justify-center">
      <div className="flex gap-6 mb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
          <FaTwitter size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400">
          <FaInstagram size={24} />
        </a>
      </div>
      <p className="text-gray-400 text-sm">
        © {new Date().getFullYear()} Footer generico xd. Todos los derechos reservados.
      </p>
    </footer>
  );
}
