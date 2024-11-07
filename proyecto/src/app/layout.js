// /src/app/layout.js
import { LanguageProvider } from "./context/LanguageContext"; // Asegúrate de que la ruta sea correcta
import { useLanguage } from "./context/LanguageContext"; // Para poder acceder al contexto si lo necesitas

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{process.env.title}</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
