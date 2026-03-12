"use client";

import { useEffect, useRef, useCallback } from "react";
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
  latLngToPinPercent,
} from "@/app/lib/config";

interface PinPickerProps {
  pinX: number;
  pinY: number;
  onSelect: (pinX: number, pinY: number) => void;
}

export function PinPicker({ pinX, pinY, onSelect }: PinPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const handleSelect = useCallback((px: number, py: number) => {
    onSelectRef.current(px, py);
  }, []);

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

    const [lng, lat] = pinPercentToLatLng(pinX, pinY);
    const markerEl = document.createElement("div");
    markerEl.className =
      "w-6 h-6 rounded-full bg-amber-500 border-2 border-white shadow-md cursor-move";
    const marker = new mapboxgl.Marker({ element: markerEl, draggable: true })
      .setLngLat([lng, lat])
      .addTo(map);

    marker.on("dragend", () => {
      const pos = marker.getLngLat();
      const [px, py] = latLngToPinPercent(pos.lat, pos.lng);
      handleSelect(px, py);
    });

    map.on("click", (e) => {
      const [px, py] = latLngToPinPercent(e.lngLat.lat, e.lngLat.lng);
      marker.setLngLat(e.lngLat);
      handleSelect(px, py);
    });

    markerRef.current = marker;
    mapRef.current = map;
    return () => {
      marker.remove();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [handleSelect]);

  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      const [lng, lat] = pinPercentToLatLng(pinX, pinY);
      markerRef.current.setLngLat([lng, lat]);
    }
  }, [pinX, pinY]);

  if (!mapboxAccessToken) {
    return (
      <div
        className="relative h-[300px] w-full cursor-crosshair overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          handleSelect(x, y);
        }}
      >
        <Image
          src={mapImagePath}
          alt="Pick location"
          fill
          className="object-contain"
        />
        <div
          className="absolute w-6 h-6 -translate-x-1/2 -translate-y-full rounded-full bg-amber-500 border-2 border-white shadow-md"
          style={{ left: `${pinX}%`, top: `${pinY}%` }}
        />
        <p className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
          Click to set location
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="h-[300px] w-full cursor-crosshair rounded-lg border border-zinc-200 overflow-hidden"
      />
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Click on the map or drag the pin to set the listing location.
      </p>
    </div>
  );
}
