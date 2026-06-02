import PlayButton from "@/components/PlayButton";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "GANAMOS/BET";

const games = [
  { icon: "🎰", name: "Tragamonedas", desc: "+500 slots con jackpots" },
  { icon: "🎡", name: "Ruleta en vivo", desc: "Europea y americana" },
  { icon: "🃏", name: "Blackjack", desc: "Mesas con crupier real" },
  { icon: "🎲", name: "Dados & Crash", desc: "Multiplicadores al instante" },
  { icon: "⚽", name: "Apuestas deportivas", desc: "Las mejores cuotas" },
  { icon: "💎", name: "Juegos VIP", desc: "Salas exclusivas" },
];

const steps = [
  { n: "1", title: "Tocá Empezar a Jugar", desc: "Te conectamos al instante por WhatsApp." },
  { n: "2", title: "Cargá tu saldo", desc: "Métodos rápidos y seguros, sin vueltas." },
  { n: "3", title: "Jugá y retirá", desc: "Premios al toque, retiros en minutos." },
];

const perks = [
  { icon: "🎁", title: "Bono de bienvenida", desc: "50% en tu primera carga." },
  { icon: "⚡", title: "Retiros en minutos", desc: "Cobrá rápido, sin demoras." },
  { icon: "🔒", title: "100% seguro", desc: "Tus datos y tu plata, protegidos." },
  { icon: "📲", title: "Atención 24/7", desc: "Soporte por WhatsApp siempre." },
];

const stats = [
  { k: "+840.000", v: "Jugadores activos" },
  { k: "+$104M", v: "Pagados este mes" },
  { k: "24/7", v: "Soporte real" },
];

export default function Home() {
  return (
    <main className="casino-bg min-h-screen overflow-hidden">
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🎰</span>
          <span className="font-display text-xl font-bold tracking-wide gold-text">
            {SITE_NAME}
          </span>
        </div>
        <span className="hidden rounded-full border border-gold/40 px-4 py-1.5 text-sm text-gold sm:inline-block">
          🟢 En vivo · Premios pagándose ahora
        </span>
      </header>

      <section className="dots relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-10 text-center">
        <div className="pointer-events-none absolute left-6 top-10 hidden text-6xl opacity-70 animate-floaty sm:block">
          🪙
        </div>
        <div className="pointer-events-none absolute right-8 top-24 hidden text-5xl opacity-70 animate-floaty [animation-delay:1.2s] sm:block">
          💎
        </div>
        <div className="pointer-events-none absolute right-24 bottom-4 hidden text-5xl opacity-60 animate-floaty [animation-delay:2s] lg:block">
          🍀
        </div>

        <div className="mx-auto mb-6 inline-flex animate-pop items-center gap-2 rounded-full border border-neon-pink/50 bg-neon-pink/10 px-4 py-1.5 text-sm font-semibold text-neon-pink shadow-glow-pink">
          🔥 Bono de bienvenida: 50% 🔥
        </div>

        <h1 className="mx-auto max-w-4xl font-display text-5xl font-black leading-[1.05] sm:text-7xl">
          <span className="gold-text">Girá, jugá y</span>
          <br />
          <span className="text-white">ganá de verdad</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-violet-200/90 sm:text-xl">
          Las mejores tragamonedas, ruleta en vivo y apuestas deportivas.
          Cargá, jugá y retirá tus premios al instante. Todo desde tu celu.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <PlayButton />
          <p className="text-sm text-violet-300/70">
            ⚡ Te conectamos por WhatsApp en segundos · +18
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-4">
          {stats.map((s) => (
            <div
              key={s.v}
              className="gold-border rounded-2xl bg-white/5 px-3 py-5 backdrop-blur"
            >
              <div className="font-display text-2xl font-bold text-gold sm:text-3xl">
                {s.k}
              </div>
              <div className="mt-1 text-xs text-violet-200/80 sm:text-sm">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {perks.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center transition hover:border-gold/40 hover:bg-white/[0.07]"
            >
              <div className="text-4xl">{p.icon}</div>
              <h3 className="mt-3 font-bold text-white">{p.title}</h3>
              <p className="mt-1 text-sm text-violet-200/70">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-5 py-12">
        <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">
          <span className="gold-text">Elegí tu juego favorito</span>
        </h2>
        <p className="mt-3 text-center text-violet-200/80">
          Cientos de juegos esperándote. Tu próxima jugada ganadora está acá.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <div
              key={g.name}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-royal/80 to-black/40 p-6 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-glow"
            >
              <div className="absolute -right-6 -top-6 text-8xl opacity-10 transition group-hover:scale-110 group-hover:opacity-20">
                {g.icon}
              </div>
              <div className="text-5xl">{g.icon}</div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">{g.name}</h3>
              <p className="mt-1 text-violet-200/70">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">
          <span className="text-white">Empezá en </span>
          <span className="gold-text">3 pasos</span>
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-gold-soft to-gold-deep font-display text-2xl font-black text-felt-dark shadow-glow animate-pulseGlow">
                {s.n}
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-violet-200/75">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-4xl px-5 py-16 text-center">
        <div className="gold-border relative overflow-hidden rounded-3xl bg-gradient-to-br from-royal to-black/60 p-10 sm:p-14">
          <div className="pointer-events-none absolute -left-10 -top-10 text-9xl opacity-10 animate-spinSlow">
            🎡
          </div>
          <h2 className="font-display text-3xl font-black sm:text-5xl">
            <span className="gold-text">Tu suerte empieza ahora</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-violet-200/85">
            Sumate a cientos de miles de jugadores que ya están ganando. Te
            atendemos al instante por WhatsApp.
          </p>
          <div className="mt-8 flex justify-center">
            <PlayButton />
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10 text-center text-sm text-violet-300/60">
        <p className="mx-auto max-w-2xl">
          🔞 Solo para mayores de 18 años. El juego puede ser adictivo, jugá con
          responsabilidad.
        </p>
        <p className="mt-3">
          © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
        </p>
      </footer>

      <FloatingPlay />
    </main>
  );
}

function FloatingPlay() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center p-4 sm:hidden">
      <div className="w-full max-w-sm rounded-2xl bg-black/40 p-2 backdrop-blur-md">
        <PlayButton className="w-full !py-4 !text-lg" />
      </div>
    </div>
  );
}
