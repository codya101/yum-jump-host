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
            Pastry chef by day. Daredevil platforming legend by also-day.
          </p>
        </div>
      </div>

      <div className="prose prose-invert mt-8 max-w-none text-yum-cream/90">
        <p>
          Long ago, the orchards of Crumbington floated in the sky on planks of
          warm cinnamon wood. Fruit grew wild. Pigs grew jealous. And somewhere
          in a small bakery, a pink-suited cat named{' '}
          <strong className="text-yum-pink-bright">Patty Pounce</strong> dipped
          a brioche into a cup of espresso and decided enough was enough.
        </p>
        <p>
          The pigs had stolen every cherry. Every banana. Every crisp little
          apple. They installed{' '}
          <strong className="text-yum-cream-soft">spinning saws</strong> as
          doorbells. They lined their hallways with{' '}
          <strong className="text-yum-cream-soft">spikes</strong> they insisted
          were “decorative.” Patty laced up her rocket sneakers, adjusted her
          goggles, and leapt into the orchards to take it all back, one tasty
          pixel at a time.
        </p>
        <p>
          <strong className="text-yum-banana">Yum Jump</strong> is a love
          letter to the platformers of the SNES era — quick, bouncy, and
          stuffed with secrets. Every level is hand-pixeled. Every fruit is
          hand-counted. Every saw is hand-spun.
        </p>
        <p>
          The screenshots, music, and silly little physics jokes were made by a
          tiny team that believes games should taste like dessert: short, rich,
          and gone too soon.
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
