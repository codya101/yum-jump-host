import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Welcome</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          This is the starter landing page for your game&apos;s static web host.
          Replace this component with your game&apos;s canvas, launcher, or landing
          content.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/about"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          About this project
        </Link>
        <a
          href="https://vite.dev"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
        >
          Vite docs
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { title: 'Fast HMR', body: 'Edit and see changes instantly with Vite.' },
          { title: 'Type safe', body: 'TypeScript strict mode enabled.' },
          { title: 'Styled', body: 'Tailwind v4 via the official Vite plugin.' },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-lg border border-slate-800 bg-slate-900/40 p-4"
          >
            <h2 className="font-semibold text-white">{card.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
