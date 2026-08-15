"use client";

import { useMemo, useState } from "react";
import VehicleCard from "@/components/VehicleCard";
import BookingModal from "@/components/BookingModal";
import { CATEGORIES } from "@/lib/data";

export default function VehiclesExplorer({ vehicles }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedCar, setSelectedCar] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vehicles.filter((car) => {
      const matchesCategory = category === "All" || car.category === category;
      const matchesQuery = q === "" || car.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [vehicles, query, category]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative flex-1 sm:max-w-xs">
          <span className="sr-only">Search by model name</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search model — Urus, Ghost, S 680…"
            className="hairline w-full border bg-obsidian-soft px-4 py-3 font-body text-sm text-ivory placeholder:text-ivory-dim/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-gold"
          />
        </label>

        <div className="flex items-center gap-3">
          <span className="font-body text-xs uppercase tracking-widest2 text-ivory-dim">
            Category
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="hairline border bg-obsidian-soft px-4 py-3 font-body text-sm text-ivory focus:outline-none focus-visible:outline-2 focus-visible:outline-gold"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-obsidian-soft">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="hairline border py-20 text-center">
          <p className="font-display text-xl italic text-ivory">
            No cars match that search.
          </p>
          <p className="mt-2 font-body text-sm text-ivory-dim">
            Try a different model name or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car) => (
            <VehicleCard
              key={car.id}
              car={car}
              onReserve={() => setSelectedCar(car)}
            />
          ))}
        </div>
      )}

      <BookingModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </div>
  );
}
