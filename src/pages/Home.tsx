import { CropTile, ELEMENTS, type CropElement } from '../components/CropTile';

type Feature = {
  element: CropElement;
  title: string;
  tagline: string;
  body: string;
  accent: string;
  spin?: boolean;
  bobDelay?: string;
};

const HEROES: Feature[] = [
  {
    element: ELEMENTS.player,
    title: 'Patty Pounce',
    tagline: 'The Pink-Suited Snack Snatcher',
    body:
      'Equipped with double-jump sneakers, a stylish pink suit, and an appetite the size of a small moon, Patty leaps around in search of every last morsel.',
    accent: 'from-yum-pink-bright/30 to-yum-pink/0',
    bobDelay: '',
  },
];

const ENEMIES: Feature[] = [
  {
    element: ELEMENTS.pig,
    title: 'Angry Pig',
    tagline: 'Bipolar Bacon Brute',
    body:
      'A common enemy found in Snackland. Bonk him on the head and he pops like a green water balloon. However, if you step in front of that snout, you’re yesterday’s dinner.',
    accent: 'from-yum-green/40 to-yum-green/0',
    bobDelay: 'bob-delay-1',
  },
  {
    element: ELEMENTS.spikes,
    title: 'Spike Trap',
    tagline: 'A Row of Pointy Teeth',
    body:
      'Polished and pristine. Time your jumps or rethink your life.',
    accent: 'from-slate-300/30 to-slate-400/0',
    bobDelay: 'bob-delay-2',
  },
  {
    element: ELEMENTS.saw,
    title: 'The Whirlybuzz',
    tagline: 'A Saw with Ambitions',
    body:
      'Spins around and tries to end your snack-tasting career. Let it get too close and it will gladly chop your body up.',
    accent: 'from-zinc-400/40 to-zinc-500/0',
    spin: true,
    bobDelay: 'bob-delay-3',
  },
];

const TREASURES: Feature[] = [
  {
    element: ELEMENTS.cherries,
    title: 'Cherry',
    tagline: 'Rare Fruit in Stage 1-1',
    body:
      'They give +50 to your score.',
    accent: 'from-yum-red-bright/35 to-yum-red/0',
    bobDelay: '',
  },
  {
    element: ELEMENTS.apple,
    title: 'Apple',
    tagline: 'Common Fruit in Stage 1-1',
    body:
      'They give +10 to your score.',
    accent: 'from-yum-red-bright/30 to-yum-red/0',
    bobDelay: 'bob-delay-1',
  },
  {
    element: ELEMENTS.banana,
    title: 'Banana',
    tagline: 'Uncommon Fruit in Stage 1-1',
    body:
      'They give +25 to your score.',
    accent: 'from-yum-banana/40 to-yum-banana/0',
    bobDelay: 'bob-delay-2',
  },
];

const PILLARS = [
  {
    title: 'Perfect Platforming',
    body:
      '60-fps controls.',
  },
  {
    title: 'Scrumptious Score Chasing',
    body:
      'Every fruit',
  },
  {
    title: 'Charming Retro Graphics',
    body:
      'Drawn one ',
  },
];

export default function Home() {
  return (
    <div className="text-yum-cream-soft">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="sky-stripes absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="font-pixel text-xs text-yum-pink-bright sm:text-sm">
              A SCRUMPTIOUS PIXEL PLATFORMER
            </p>
            <h1 className="font-pixel text-4xl leading-tight text-yum-cream-soft drop-shadow-[3px_3px_0_rgba(0,0,0,0.6)] sm:text-6xl">
              <span className="text-yum-pink-bright">YUM</span>{' '}
              <span className="text-yum-banana">JUMP</span>
            </h1>
            <p className="max-w-xl text-lg text-yum-cream/85 sm:text-xl">
              Hop, snack, and survive a pastel obstacle-course of angry
              pigs, spinning saws, suspicious spikes, and more. Every fruit you
              grab is a tiny victory. Every fall is a dramatic tragedy.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                id="play"
                href="/downloads/Yum-Jump-Demo-Windows.zip"
                download
                className="inline-flex items-center gap-2 rounded-md bg-yum-pink-bright px-6 py-3 font-pixel text-sm uppercase tracking-wider text-yum-sky shadow-[0_4px_0_#9d2638] transition-transform hover:translate-y-[2px] hover:shadow-[0_2px_0_#9d2638]"
              >
                ▶ Play Demo
              </a>
              <a
                href="#cast"
                className="inline-flex items-center gap-2 rounded-md border-2 border-yum-cream/60 px-6 py-3 font-pixel text-sm uppercase tracking-wider text-yum-cream-soft transition-colors hover:bg-yum-cream/10"
              >
                Meet the Cast
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm text-yum-cream/70">
              <span className="flex items-center gap-2">
                <CropTile element={ELEMENTS.apple} displaySize={28} className="bob" />
                Apples
              </span>
              <span className="flex items-center gap-2">
                <CropTile
                  element={ELEMENTS.bananaHud}
                  displaySize={28}
                  className="bob bob-delay-1"
                />
                Bananas
              </span>
              <span className="flex items-center gap-2">
                <CropTile
                  element={ELEMENTS.cherries}
                  displaySize={28}
                  className="bob bob-delay-2"
                />
                Cherries
              </span>
              <span className="flex items-center gap-2">
                <CropTile
                  element={ELEMENTS.strawberry}
                  displaySize={28}
                  className="bob bob-delay-3"
                />
                Strawberries
              </span>
              <span className="flex items-center gap-2">
                <CropTile
                  element={ELEMENTS.orange}
                  displaySize={28}
                  className="bob bob-delay-4"
                />
                Oranges
              </span>
              <span className="flex items-center gap-2">
                <CropTile
                  element={ELEMENTS.kiwi}
                  displaySize={28}
                  className="bob"
                />
                Kiwis
              </span>
              <span className="flex items-center gap-2">
                <CropTile
                  element={ELEMENTS.pineapple}
                  displaySize={28}
                  className="bob bob-delay-1"
                />
                Pineapples
              </span>
              <span className="flex items-center gap-2">
                <CropTile
                  element={ELEMENTS.melon}
                  displaySize={28}
                  className="bob bob-delay-2"
                />
                Melons
              </span>
            </div>
          </div>

          {/* Floating cast on the right side of the hero */}
          <div className="relative h-[320px] sm:h-[420px]">
            <CropTile
              element={ELEMENTS.player}
              displaySize={180}
              className="bob absolute left-4 top-6 drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]"
            />
            <CropTile
              element={ELEMENTS.pig}
              displaySize={150}
              className="bob bob-delay-2 absolute right-2 top-2 drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]"
            />
            <CropTile
              element={ELEMENTS.cherries}
              displaySize={90}
              className="bob bob-delay-1 absolute right-24 bottom-12 drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
            />
            <CropTile
              element={ELEMENTS.banana}
              displaySize={90}
              className="bob bob-delay-3 absolute left-32 bottom-2 drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
            />
            <CropTile
              element={ELEMENTS.saw}
              displaySize={110}
              className="spin-saw absolute right-4 top-40 drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </section>

      {/* SCREENSHOT SHOWCASE */}
      <section
        id="screenshot"
        className="cream-wall border-y-4 border-yum-wood-dark py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 max-w-2xl">
            <p className="font-pixel text-xs text-yum-red sm:text-sm">
              SNACK PEEK
            </p>
            <h2 className="mt-2 font-pixel text-2xl text-yum-sky sm:text-4xl">
              A Whole Stage in a Single Glance
            </h2>
          </div>

          <figure className="wood-frame overflow-hidden rounded-lg p-2 shadow-[0_12px_0_rgba(0,0,0,0.35)]">
            <img
              src="/yum-jump-screenshot.png"
              alt="A screenshot of Yum Jump showing Patty Pounce on a wooden platform with cherries, apples, bananas, spikes, a saw blade, and a green pig enemy."
              className="pixel-art w-full rounded-md border-2 border-black/40"
            />
            <figcaption className="px-3 pt-2 pb-1 text-center font-pixel text-[10px] text-yum-cream-soft sm:text-xs">
              ▲ Stage 1-1 “Tasty Beginnings”
            </figcaption>
          </figure>

          {/* HUD callout strip */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-2 border-yum-wood-dark bg-yum-sky p-4 text-yum-cream-soft">
              <CropTile
                element={ELEMENTS.score}
                displaySize={260}
                className="mx-auto"
              />
              <h3 className="mt-3 font-pixel text-sm text-yum-pink-bright">
                The Sweetscore
              </h3>
              <p className="mt-1 text-sm text-yum-cream/80">
                Every snack you snag rolls into one big crimson tally at the top
                of the screen. Make sure you collect enough. If your score
                isn't high enough by the end, you cannot advance.
              </p>
            </div>
            <div className="rounded-lg border-2 border-yum-wood-dark bg-yum-sky p-4 text-yum-cream-soft">
              <div className="flex items-end gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CropTile element={ELEMENTS.apple} displaySize={36} />
                    <span className="font-pixel text-yum-cream-soft">x 6 / 9</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CropTile element={ELEMENTS.bananaHud} displaySize={36} />
                    <span className="font-pixel text-yum-cream-soft">x 1 / 5</span>
                  </div>
                </div>
              </div>
              <h3 className="mt-3 font-pixel text-sm text-yum-banana">
                The Snack-O-Meter
              </h3>
              <p className="mt-1 text-sm text-yum-cream/80">
                Keep track of your progress for each delectable fruit.
                See what you're missing out on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAST: HEROES + ENEMIES */}
      <section id="cast" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 text-center">
          <p className="font-pixel text-xs text-yum-pink-bright sm:text-sm">
            THE LEGENDS OF SNACKLAND
          </p>
          <h2 className="mt-2 font-pixel text-2xl text-yum-cream-soft sm:text-4xl">
            Meet the Cast
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-yum-cream/75">
            Every pixel on screen has a job. Some bounce, some spin, some try
            very hard to nibble you. Here’s a sneak peek of the menu — heroes,
            hazards, and the snacks caught in the middle. Play to discover more.
          </p>
        </div>

        <h3 className="mb-4 font-pixel text-base text-yum-pink-bright">
          ★ The Hero
        </h3>
        <FeatureGrid items={HEROES} />

        <h3 className="mt-12 mb-4 font-pixel text-base text-yum-green">
          ☠ The Hazards
        </h3>
        <FeatureGrid items={ENEMIES} />

        <h3 className="mt-12 mb-4 font-pixel text-base text-yum-banana">
          ✿ The Treasures
        </h3>
        <FeatureGrid items={TREASURES} />
      </section>

      {/* PILLARS */}
      <section className="cream-wall border-y-4 border-yum-wood-dark py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 max-w-2xl">
            <p className="font-pixel text-xs text-yum-red sm:text-sm">
              WHY YOU’LL CHOMP IT UP
            </p>
            <h2 className="mt-2 font-pixel text-2xl text-yum-sky sm:text-4xl">
              Tiny Game. Big Flavor.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {PILLARS.map((p) => (
              <article
                key={p.title}
                className="rounded-lg border-2 border-yum-wood-dark bg-yum-sky p-5 text-yum-cream-soft shadow-[0_5px_0_rgba(0,0,0,0.25)]"
              >
                <h3 className="font-pixel text-sm text-yum-pink-bright">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-yum-cream/80">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <CropTile
          element={ELEMENTS.player}
          displaySize={120}
          className="bob mx-auto mb-6 drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]"
        />
        <h2 className="font-pixel text-2xl text-yum-cream-soft sm:text-4xl">
          Ready to take a bite?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-yum-cream/75">
          Yum Jump is in the oven. Check out the demo, send a
          screenshot to your friends, and prepare your jumping thumb.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="#screenshot"
            className="rounded-md bg-yum-pink-bright px-6 py-3 font-pixel text-sm uppercase tracking-wider text-yum-sky shadow-[0_4px_0_#9d2638] transition-transform hover:translate-y-[2px] hover:shadow-[0_2px_0_#9d2638]"
          >
            See It Again
          </a>
          <a
            href="/about"
            className="rounded-md border-2 border-yum-cream/60 px-6 py-3 font-pixel text-sm uppercase tracking-wider text-yum-cream-soft transition-colors hover:bg-yum-cream/10"
          >
            Read the Lore
          </a>
        </div>
      </section>
    </div>
  );
}

function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <article
          key={it.title}
          className={`group relative overflow-hidden rounded-xl border-2 border-yum-wood-dark bg-yum-sky-soft p-5 shadow-[0_6px_0_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1`}
        >
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${it.accent}`}
            aria-hidden
          />
          <div className="relative flex items-start gap-4">
            <div className="shrink-0 rounded-lg border-2 border-yum-wood-dark bg-yum-sky p-3">
              <CropTile
                element={it.element}
                displaySize={96}
                className={[
                  it.spin ? 'spin-saw' : 'bob',
                  it.bobDelay ?? '',
                ].join(' ')}
              />
            </div>
            <div className="min-w-0">
              <h4 className="font-pixel text-sm text-yum-pink-bright">
                {it.title}
              </h4>
              <p className="mt-1 text-xs uppercase tracking-wider text-yum-cream/60">
                {it.tagline}
              </p>
              <p className="mt-2 text-sm text-yum-cream/85">{it.body}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
