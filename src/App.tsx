import { NavLink, Outlet } from 'react-router-dom';
import { CropTile, ELEMENTS } from './components/CropTile';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors',
    isActive
      ? 'bg-yum-red text-yum-cream-soft shadow-[0_0_0_2px_rgba(0,0,0,0.4)]'
      : 'text-yum-cream/80 hover:bg-yum-sky-soft hover:text-yum-cream-soft',
  ].join(' ');

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-40 border-b-4 border-yum-wood-dark bg-yum-sky/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <NavLink
            to="/"
            className="group flex items-center gap-3"
            aria-label="Yum Jump home"
          >
            <CropTile
              element={ELEMENTS.player}
              displaySize={48}
              className="bob shrink-0 transition-transform group-hover:scale-110"
            />
            <span className="font-pixel text-lg text-yum-red-bright drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] sm:text-xl">
              OBRAXUS GAMES
            </span>
          </NavLink>
          <div className="flex gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              Lore
            </NavLink>
            <NavLink
              to="/play"
              className="rounded-md bg-yum-pink-bright px-3 py-2 text-sm font-semibold uppercase tracking-wider text-yum-sky shadow-[0_3px_0_#9d2638] transition-transform hover:translate-y-[1px] hover:shadow-[0_2px_0_#9d2638]"
            >
              Play
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t-4 border-yum-wood-dark bg-yum-sky">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center text-sm text-yum-cream/70 sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <CropTile element={ELEMENTS.cherries} displaySize={36} className="bob" />
            <span className="font-title text-2xl text-[#f30000]">Yum Jump</span>
          </div>
          <p>
            &copy; {new Date().getFullYear()} Obraxus Games
          </p>
        </div>
      </footer>
    </div>
  );
}
