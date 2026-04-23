export default function About() {
  return (
    <section className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <p className="mt-3 text-slate-300">
        This site is a static single-page application built with Vite, React 19,
        TypeScript, Tailwind CSS v4, and React Router. It compiles to plain
        HTML/CSS/JS in <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm">dist/</code>{' '}
        and is intended to be served by Apache via scp deploy.
      </p>
      <p className="mt-3 text-slate-300">
        See <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm">README.md</code>{' '}
        for local development and deploy instructions.
      </p>
    </section>
  );
}
