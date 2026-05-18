import { CropTile, ELEMENTS } from '../components/CropTile';

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-yum-cream-soft">
      <p className="font-pixel text-xs text-yum-pink-bright sm:text-sm">
        THE LORE
      </p>
      <h1 className="mt-2 font-pixel text-3xl text-yum-cream-soft sm:text-5xl">
        A World Made of Snacks
      </h1>

      <div className="mt-8 flex items-center gap-4 rounded-xl border-2 border-yum-wood-dark bg-yum-sky-soft p-4">
        <CropTile element={ELEMENTS.player} displaySize={96} className="bob" />
        <div>
          <h2 className="font-pixel text-sm text-yum-pink-bright">
            PATTY POUNCE
          </h2>
          <p className="text-sm text-yum-cream/80">
            Pastry chef & platforming legend.
          </p>
        </div>
      </div>

      <div className="prose prose-invert mt-8 max-w-none text-yum-cream/90">
        <p>
          The game takes place in Snackland. The main character is
          a pink-suited baker named{' '}
          <strong className="text-yum-pink-bright">Patty Pounce</strong> who is on a
          mission to gather fruits for the desserts she sells at her bakery.
        </p>
        <p>
          The fruits are guarded by various obstacles. There are{' '}
          <strong className="text-yum-cream-soft">spinning saws</strong> trying
          to chop you up. The walls and floors are lined with{' '}
          <strong className="text-yum-cream-soft">spikes</strong>.
          Patty is determined to get those fruits, no matter what. Using her rocket
          sneakers, she can double jump, wall slide, and wall jump her way through the
          treacherous terrain. She’s a plucky little baker with a big appetite for adventure.
        </p>
        <p>
          <strong className="text-yum-banana">Yum Jump</strong> is a love
          letter to the platformers of the SNES era — quick, bouncy, and
          stuffed with secrets. The game is designed to be a short and sweet treat,
          perfect for a quick break or a weekend binge.
        </p>
        <p>
          Made by <a href="https://www.obraxus.com" className="text-yum-pink-bright hover:underline">Obraxus Games</a>,
          a one-person studio run by Antonio Codignotto.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <CreditCard label="Pixels" value="Hand-baked" />
        <CreditCard label="Music" value="Chiptune+" />
        <CreditCard label="Saws" value="Lovingly sharpened" />
      </div>
    </section>
  );
}

function CreditCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border-2 border-yum-wood-dark bg-yum-sky-soft p-4 text-center">
      <p className="font-pixel text-[10px] uppercase tracking-wider text-yum-cream/60">
        {label}
      </p>
      <p className="mt-1 font-pixel text-sm text-yum-pink-bright">{value}</p>
    </div>
  );
}
