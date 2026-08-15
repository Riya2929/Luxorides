import { getVehicles } from "@/lib/data";
import VehiclesExplorer from "@/components/VehiclesExplorer";

// Data fetching stays on the server: the fleet list is not something the
// client ever needs to re-request on its own, so it is resolved once here
// and handed down as a plain prop. Search/filter/modal state below this
// point is inherently client-side, which is why VehiclesExplorer is a
// separate "use client" component.
export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <main className="min-h-screen px-6 py-16 sm:px-10 lg:px-16">
      <header className="mx-auto mb-12 max-w-6xl">
        <p className="font-body text-xs uppercase tracking-widest2 text-gold">
          The Fleet
        </p>
        <h1 className="mt-3 font-display text-4xl italic text-ivory sm:text-5xl">
          Featured vehicles
        </h1>
        <div className="pinstripe mt-8" />
      </header>

      <div className="mx-auto max-w-6xl">
        <VehiclesExplorer vehicles={vehicles} />
      </div>
    </main>
  );
}
