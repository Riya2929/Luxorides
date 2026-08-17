"use client";

import { useEffect, useMemo, useState } from "react";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(pickup, ret) {
  if (!pickup || !ret) return 0;

  const start = new Date(pickup);
  const end = new Date(ret);

  const diff = Math.round(
    (end - start) / (1000 * 60 * 60 * 24)
  );

  return diff > 0 ? diff : diff === 0 ? 1 : 0;
}

export default function BookingModal({ car, onClose }) {
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState("idle");
  const [mounted, setMounted] = useState(false);

  // Toast state
  const [toast, setToast] = useState("");

  const isOpen = Boolean(car);

  useEffect(() => {
    if (isOpen) {
      setPickupDate(todayISO());
      setReturnDate("");
      setStatus("idle");
      setToast("");

      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [isOpen, car?.id]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKey);

      return () => {
        document.removeEventListener("keydown", handleKey);
      };
    }
  }, [isOpen, onClose]);

  const days = useMemo(
    () => daysBetween(pickupDate, returnDate),
    [pickupDate, returnDate]
  );

  const total = useMemo(
    () => (car ? days * car.pricePerDay : 0),
    [car, days]
  );

  if (!car) return null;

  const canSubmit =
    days > 0 && status !== "submitting";

  function handleSubmit(e) {
    e.preventDefault();

    if (!canSubmit) return;

    // Button loading state
    setStatus("submitting");

    // Simulated booking request
    setTimeout(() => {
      setStatus("success");

      // SHOW TOAST
      setToast("Reservation confirmed successfully!");

      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast("");
      }, 3000);
    }, 700);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={`Reserve ${car.brand} ${car.name}`}
    >
      {/* Background Overlay */}
      <button
        aria-label="Close booking drawer"
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed right-5 top-5 z-[100] animate-in slide-in-from-right-5 duration-300">
          <div className="rounded-lg border border-green-500/40 bg-obsidian px-5 py-4 shadow-panel">
            <div className="flex items-center gap-3">
              {/* Check Icon */}
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-green-500 text-green-400">
                ✓
              </span>

              <div>
                <p className="font-body text-xs uppercase tracking-widest2 text-green-400">
                  Booking Confirmed
                </p>

                <p className="mt-1 font-body text-sm text-ivory">
                  {toast}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Drawer */}
      <div
        className={`card-surface relative flex h-full w-full max-w-md flex-col border-l border-gold/20 p-6 shadow-panel transition-transform duration-300 ease-out sm:p-8 ${
          mounted
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-body text-xs uppercase tracking-widest2 text-gold">
              Reserve
            </p>

            <h2 className="mt-1 font-display text-3xl italic text-ivory">
              {car.brand} {car.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="font-body text-2xl text-ivory-dim transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"
          >
            &times;
          </button>
        </div>

        <div className="pinstripe my-6" />

        {/* SUCCESS SCREEN */}
        {status === "success" ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60">
              <span className="font-display text-2xl text-gold-soft">
                &#10003;
              </span>
            </div>

            <h3 className="mt-6 font-display text-2xl italic text-ivory">
              Reservation confirmed
            </h3>

            <p className="mt-2 max-w-xs font-body text-sm text-ivory-dim">
              {car.brand} {car.name} is held for{" "}
              {days} day{days === 1 ? "" : "s"}.
              A concierge will confirm delivery details by email.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 border border-gold/60 px-6 py-3 font-body text-xs uppercase tracking-widest2 text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-obsidian"
            >
              Done
            </button>
          </div>
        ) : (
          /* BOOKING FORM */
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col"
          >
            {/* Vehicle */}
            <label className="block">
              <span className="font-body text-xs uppercase tracking-widest2 text-ivory-dim">
                Vehicle
              </span>

              <input
                type="text"
                value={`${car.brand} ${car.name}`}
                readOnly
                className="hairline mt-2 w-full border bg-obsidian px-4 py-3 font-body text-sm text-ivory-dim"
              />
            </label>

            {/* Dates */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              {/* Pickup Date */}
              <label className="block">
                <span className="font-body text-xs uppercase tracking-widest2 text-ivory-dim">
                  Pickup date
                </span>

                <input
                  type="date"
                  required
                  min={todayISO()}
                  value={pickupDate}
                  onChange={(e) =>
                    setPickupDate(e.target.value)
                  }
                  className="hairline mt-2 w-full border bg-obsidian-soft px-3 py-3 font-body text-sm text-ivory focus:outline-none focus-visible:outline-2 focus-visible:outline-gold"
                />
              </label>

              {/* Return Date */}
              <label className="block">
                <span className="font-body text-xs uppercase tracking-widest2 text-ivory-dim">
                  Return date
                </span>

                <input
                  type="date"
                  required
                  min={pickupDate || todayISO()}
                  value={returnDate}
                  onChange={(e) =>
                    setReturnDate(e.target.value)
                  }
                  className="hairline mt-2 w-full border bg-obsidian-soft px-3 py-3 font-body text-sm text-ivory focus:outline-none focus-visible:outline-2 focus-visible:outline-gold"
                />
              </label>
            </div>

            {/* Date Error */}
            {returnDate && days === 0 && (
              <p className="mt-3 font-body text-xs text-burgundy-soft">
                Return date must be after the pickup date.
              </p>
            )}

            {/* Total */}
            <div className="mt-auto pt-8">
              <div className="hairline border-t pt-5">
                <div className="flex items-baseline justify-between font-body text-sm text-ivory-dim">
                  <span>
                    Rs {car.pricePerDay.toLocaleString()}{" "}
                    &times; {days || 0} day
                    {days === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-body text-xs uppercase tracking-widest2 text-ivory-dim">
                    Total
                  </span>

                  <span className="meter text-3xl text-gold-soft">
                    Rs {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-6 w-full border border-gold/60 px-6 py-4 font-body text-xs uppercase tracking-widest2 text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-obsidian disabled:cursor-not-allowed disabled:border-obsidian-line disabled:text-ivory-dim disabled:hover:bg-transparent disabled:hover:text-ivory-dim"
              >
                {status === "submitting"
                  ? "Confirming…"
                  : "Confirm reservation"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}