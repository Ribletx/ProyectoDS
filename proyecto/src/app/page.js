import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-red-100 text-6xl flex flex-col gap-2 align-center justify-center h-screen items-center">
      Pagina principal {process.env.name}
      <Link href="/login">
        Sign In
      </Link>
      <Link href="/register">
        Register
      </Link>
    </div>
  );
} 