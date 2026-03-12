"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import {
  mapboxAccessToken,
  mapCenter,
  mapZoom,
  mapStyle,
  mapImagePath,
  pinPercentToLatLng,
} from "@/app/lib/config";

export interface MapPin {
  id: string;
  pinX: number;
  pinY: number;
  title: string;
}

interface MapViewProps {
  pins: MapPin[];
}

export function MapView({ pins }: MapViewProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || !mapboxAccessToken) return;

    mapboxgl.accessToken = mapboxAccessToken;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: mapStyle,
      center: mapCenter,
      zoom: mapZoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    pins.forEach((pin) => {
      const [lng, lat] = pinPercentToLatLng(pin.pinX, pin.pinY);

      const markerEl = document.createElement("div");
      markerEl.className =
        "cursor-pointer w-8 h-8 rounded-full bg-amber-500 border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform";
      markerEl.innerHTML = "📍";
      markerEl.title = pin.title;

      const marker = new mapboxgl.Marker({ element: markerEl })
        .setLngLat([lng, lat])
        .addTo(map);

      markerEl.addEventListener("click", () => {
        router.push(`/listings/${pin.id}`);
      });
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [pins, router]);

  if (!mapboxAccessToken) {
    return (
      <div className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 aspect-[4/3] min-h-[300px]">
        <Image
          src={mapImagePath}
          alt="Campus map"
          fill
          className="object-contain"
        />
        {pins.map((pin) => (
          <button
            key={pin.id}
            type="button"
            className="absolute cursor-pointer w-8 h-8 -translate-x-1/2 -translate-y-full rounded-full bg-amber-500 border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform"
            style={{ left: `${pin.pinX}%`, top: `${pin.pinY}%` }}
            title={pin.title}
            onClick={() => router.push(`/listings/${pin.id}`)}
          >
            📍
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] rounded-lg border border-zinc-200 overflow-hidden"
    />
  );
}
