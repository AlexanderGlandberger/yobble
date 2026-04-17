"use client";

import { useMemo, useState } from "react";
import { MapPin, Navigation, LocateFixed } from "lucide-react";
import { mockJobs } from "@/lib/mock-jobs";
import { categoryLabels } from "@/lib/categories";
import { Job } from "@/types/job";

type Coordinates = { lat: number; lng: number };

function haversineKm(a: Coordinates, b: Coordinates) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const c =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin(dLat / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
      )
    );

  return 6371 * c;
}

function buildGoogleEmbedUrl(selected: Job, userLocation: Coordinates | null) {
  const destination = encodeURIComponent(selected.companyAddress ?? `${selected.company}, ${selected.location}`);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (apiKey && userLocation) {
    return `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${userLocation.lat},${userLocation.lng}&destination=${destination}`;
  }

  return `https://www.google.com/maps?q=${destination}&output=embed`;
}

export function NearbyMap() {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationState, setLocationState] = useState<"idle" | "loading" | "ready" | "error">("idle");

  const jobsWithDistance = useMemo(() => {
    if (!userLocation) return [];

    return mockJobs
      .filter((job) => job.coordinates)
      .map((job) => ({
        ...job,
        distanceKm: haversineKm(userLocation, job.coordinates as Coordinates),
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [userLocation]);

  const nearbyJobs = jobsWithDistance.filter((job) => job.distanceKm <= 60).slice(0, 12);
  const selectedJob = nearbyJobs[0] ?? jobsWithDistance[0] ?? null;

  const mapUrl = selectedJob ? buildGoogleEmbedUrl(selectedJob, userLocation) : null;

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationState("error");
      return;
    }

    setLocationState("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationState("ready");
      },
      () => setLocationState("error"),
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Nära dig</h2>
        <p className="mt-1 text-sm text-slate-500">
          Dela din plats för att visa jobb nära dig och företagsadresser på kartan.
        </p>

        <button
          onClick={requestLocation}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          <LocateFixed className="h-4 w-4" />
          {locationState === "loading" ? "Hämtar plats..." : "Använd min plats"}
        </button>

        {locationState === "error" && (
          <p className="mt-2 text-sm text-rose-600">
            Kunde inte läsa din plats. Kontrollera webbläsarens platsbehörighet.
          </p>
        )}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {mapUrl ? (
            <iframe
              title="Karta över jobb nära dig"
              src={mapUrl}
              className="h-[560px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-[560px] items-center justify-center px-6 text-center text-sm text-slate-500">
              Dela din plats för att visa karta med närmaste jobb.
            </div>
          )}
        </div>

        <div className="space-y-3">
          {(nearbyJobs.length ? nearbyJobs : jobsWithDistance.slice(0, 8)).map((job) => (
            <article key={job.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{job.title}</h3>
                  <p className="text-sm text-slate-500">{job.company}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                  {Math.round(job.distanceKm)} km
                </span>
              </div>

              <div className="mt-3 space-y-1 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {job.companyAddress}
                </p>
                <p className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  {categoryLabels[job.category]}
                </p>
              </div>
            </article>
          ))}

          {locationState === "ready" && jobsWithDistance.length === 0 && (
            <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
              Inga jobb med koordinater hittades ännu.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
