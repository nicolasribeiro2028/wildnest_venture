import { getListingsForMap } from "@/app/actions/listings";
import { MapView } from "@/components/map/MapView";

export default async function SearchPage() {
  const listings = await getListingsForMap();

  const pins = listings.map((l) => ({
    id: l.id,
    pinX: l.pinX,
    pinY: l.pinY,
    title: l.title,
  }));

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
        Campus Map
      </h1>
      <div className="w-full max-w-4xl">
        <MapView pins={pins} />
      </div>
    </div>
  );
}
