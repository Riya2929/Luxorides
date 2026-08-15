import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 20%, rgba(201,162,39,0.14), transparent 70%)",
        }}
      />

      <p className="font-body text-xs uppercase tracking-widest2 text-gold">
        Luxorides
      </p>

      <h1 className="mt-6 max-w-3xl font-display text-5xl italic leading-[1.1] text-ivory sm:text-6xl">
        The car arrives.
        <br />
        <span className="not-italic text-gold-soft">You don&rsquo;t wait.</span>
      </h1>

      <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-ivory-dim">
        A private fleet of Rolls-Royce, Lamborghini, and Mercedes-Maybach,
        reserved in minutes and delivered wherever you land.
      </p>

      <Link
        href="/vehicles"
        className="mt-10 inline-flex items-center gap-3 border border-gold/50 px-8 py-3 font-body text-sm uppercase tracking-widest2 text-ivory transition-colors hover:border-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold"
      >
        View the fleet
        <span aria-hidden>&rarr;</span>
      </Link>

      <div className="pinstripe absolute bottom-0 left-0 right-0" />
    </main>
  );
}
