export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-10 text-center text-zinc-400">
      <p>Contacto: ventasteffy25@gmail.com</p>
      <p className="mt-1">Síguenos en redes sociales</p>
      <div className="mt-4 flex justify-center gap-6 text-sm font-medium">
        <a className="transition-colors hover:text-rose-500" href="https://www.instagram.com/teffy1410/" target="_blank" rel="noreferrer">
          Instagram: Teffy
        </a>
        <a className="transition-colors hover:text-rose-500" href="https://www.facebook.com/zstephanie.rodriguez" target="_blank" rel="noreferrer">
          Facebook: Stephanie Rodriguez
        </a>
      </div>
    </footer>
  );
}
