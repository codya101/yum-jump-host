import { CropTile, ELEMENTS } from '../components/CropTile';

// The Unity WebGL build is staged into public/game/ by
// scripts/build-webgl.sh and served unzipped at /game/index.html.
// The .htaccess SPA fallback passes real files/dirs through, so this
// URL hits the Unity player directly rather than the React app.
const GAME_URL = '/game/index.html';
const DOWNLOAD_URL = '/downloads/Yum-Jump-Demo-Windows.zip';

export default function Play() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 text-yum-cream-soft">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-pixel text-xs text-yum-pink-bright sm:text-sm">
            NOW PLAYING
          </p>
          <h1 className="mt-2 font-title text-5xl leading-none text-[#f30000] drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)] sm:text-6xl">
            Yum Jump
          </h1>
        </div>
        <a
          href={DOWNLOAD_URL}
          download
          className="inline-flex items-center gap-2 rounded-md border-2 border-yum-cream/60 px-4 py-2 font-pixel text-xs uppercase tracking-wider text-yum-cream-soft transition-colors hover:bg-yum-cream/10"
        >
          ⤓ Download for Windows
        </a>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border-2 border-yum-wood-dark bg-black shadow-[0_6px_0_rgba(0,0,0,0.5)]">
        {/* 16:9 responsive frame for the WebGL canvas. */}
        <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
          <iframe
            src={GAME_URL}
            title="Yum Jump"
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; gamepad"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm text-yum-cream/70">
        <CropTile element={ELEMENTS.apple} displaySize={28} className="bob" />
        <p>
          Loading can take a moment on first visit — the game streams a few
          megabytes. Click the canvas to give it keyboard focus. Best played on
          a desktop browser with hardware acceleration enabled for smooth
          performance. Your progress is saved automatically in this browser on
          this device — it isn’t synced across browsers or devices.
        </p>
      </div>
    </section>
  );
}
