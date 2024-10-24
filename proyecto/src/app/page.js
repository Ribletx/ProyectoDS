// src/app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Página Principal</h1>
      <nav>
        <ul>
          <li><Link href="/login">Iniciar Sesión</Link></li>
          <li><Link href="/register">Registrarse</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
}