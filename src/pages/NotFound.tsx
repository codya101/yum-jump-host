import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function NotFound() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 404;
  const message = isRouteErrorResponse(error)
    ? error.statusText || 'Page not found'
    : 'Page not found';

  return (
    <section className="mx-auto max-w-lg py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
        Error {status}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{message}</h1>
      <p className="mt-3 text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
      >
        Back home
      </Link>
    </section>
  );
}
