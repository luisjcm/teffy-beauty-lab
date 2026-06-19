import { assetUrl } from '../utils/assets.js';

export function QuienesSomos() {
  return (
    <section id="quienes-somos" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-rose-500/10 backdrop-blur-xl md:flex-row md:items-center md:gap-12 lg:p-10">
        <div className="w-full md:w-1/2">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-rose-400">Quiénes Somos</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black text-white sm:text-4xl">
            Una tienda pensada para resaltar la belleza natural con una experiencia más humana y elegante.
          </h2>
          <div className="mt-6 space-y-4 text-zinc-300 leading-8">
            <p>
              En <strong>Teffy's</strong> nos apasiona seleccionar productos de cuidado personal y cosméticos que combinan calidad, confianza y estilo.
            </p>
            <p>
              Nacimos con la misión de ofrecer una experiencia de compra clara, cercana y visualmente cuidada, para que cada detalle transmita valor.
            </p>
          </div>
        </div>

        <div className="flex w-full justify-center md:w-1/2">
          <img
            src={assetUrl('img/fototeffy.jpg')}
            alt="Equipo Teffy's"
            className="w-full max-w-sm rounded-[1.75rem] object-cover shadow-2xl shadow-black/40"
          />
        </div>
      </div>
    </section>
  );
}
