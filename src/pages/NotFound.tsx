import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { CropTile, ELEMENTS } from '../components/CropTile';

export default function NotFound() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 404;
  const message = isRouteErrorResponse(error)
    ? error.statusText || 'Page not found'
    : 'Page not found';

  return (
    <section className="mx-auto max-w-lg px-4 py-20 text-center text-yum-cream-soft">
      <CropTile
        element={ELEMENTS.spikes}
        displaySize={180}
        className="mx-auto"
      />
      <p className="mt-4 font-pixel text-xs uppercase tracking-wider text-yum-pink-bright">
        Error {status}
      </p>
      <h1 className="mt-2 font-pixel text-3xl text-yum-cream-soft sm:text-4xl">
        Ouch. Spikes.
      </h1>
      <p className="mt-3 text-yum-cream/80">
        {message}. Looks like you fell off the platform. Don’t worry — Patty
        does this all the time.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-md bg-yum-pink-bright px-5 py-3 font-pixel text-sm uppercase tracking-wider text-yum-sky shadow-[0_4px_0_#9d2638] transition-transform hover:translate-y-[2px] hover:shadow-[0_2px_0_#9d2638]"
      >
        ← Back to safety
      </Link>
    </section>
  );
}
