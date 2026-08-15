"use client";

// Rendered inside VehiclesExplorer (a client component), so this is part of
// the client bundle regardless; the directive is kept for clarity since it
// owns local image-fallback state.

import { useState } from "react";

const CATEGORY_LABEL = {
  Sedan: "Sedan",
  SUV: "SUV",
  Supercar: "Supercar",
};

export default function VehicleCard({ car, onReserve }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="card-surface hairline group flex flex-col border transition-colors hover:border-gold/40">
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-obsidian-soft">
            <span className="font-display italic text-ivory-dim">
              {car.brand} {car.name}
            </span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={car.image}
            alt={`${car.brand} ${car.name}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-4 top-4 border border-gold/40 bg-obsidian/80 px-3 py-1 font-body text-[11px] uppercase tracking-widest2 text-gold-soft">
          {CATEGORY_LABEL[car.category] ?? car.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-body text-xs uppercase tracking-widest2 text-ivory-dim">
          {car.brand}
        </p>
        <h3 className="mt-1 font-display text-2xl italic text-ivory">
          {car.name}
        </h3>

        {car.blurb ? (
          <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ivory-dim">
            {car.blurb}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        <div className="mt-5 flex items-center justify-between border-t border-obsidian-line pt-4">
          <div>
            <span className="meter text-lg text-gold-soft">
              ${car.pricePerDay.toLocaleString()}
            </span>
            <span className="ml-1 font-body text-xs text-ivory-dim">
              / day
            </span>
          </div>

          <button
            type="button"
            onClick={onReserve}
            className="border border-gold/60 px-4 py-2 font-body text-xs uppercase tracking-widest2 text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-obsidian focus-visible:outline-2 focus-visible:outline-gold"
          >
            Reserve Now
          </button>
        </div>
      </div>
    </article>
  );
}
