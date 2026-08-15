// In a production build this module would be replaced by calls to a real
// fleet-management service. It is intentionally isolated here so that swap
// is a one-file change.

export const CATEGORIES = ["All", "Sedan", "SUV", "Supercar"];

export const vehicles = [
  {
    id: "1",
    name: "Ghost",
    brand: "Rolls-Royce",
    category: "Sedan",
    pricePerDay: 1200,
    image:
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80",
    blurb: "Whisper-quiet presence, coach-built for the rear seat.",
  },
  {
    id: "2",
    name: "Urus",
    brand: "Lamborghini",
    category: "SUV",
    pricePerDay: 950,
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80",
    blurb: "A super-SUV that trades no performance for ride height.",
  },
  {
    id: "3",
    name: "S 680",
    brand: "Mercedes-Maybach",
    category: "Sedan",
    pricePerDay: 1050,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    blurb: "Executive-class cabin with independent rear-seat control.",
  },
  {
    id: "4",
    name: "Huracan Evo",
    brand: "Lamborghini",
    category: "Supercar",
    pricePerDay: 1450,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    blurb: "A naturally-aspirated V10, tuned for the open highway.",
  },
  {
    id: "5",
    name: "Cullinan",
    brand: "Rolls-Royce",
    category: "SUV",
    pricePerDay: 1350,
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80",
    blurb: "The marque's first SUV, built for any terrain, quietly.",
  },
  {
    id: "6",
    name: "911 Turbo S",
    brand: "Porsche",
    category: "Supercar",
    pricePerDay: 890,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    blurb: "The daily-driveable supercar, unmistakable silhouette.",
  },
];

/**
 * Simulates a network round-trip to a fleet service. Used by both the
 * Route Handler (app/api/vehicles/route.js) and the server component
 * that renders the /vehicles page, so there is a single source of truth
 * for the fleet list.
 */
export async function getVehicles() {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return vehicles;
}
