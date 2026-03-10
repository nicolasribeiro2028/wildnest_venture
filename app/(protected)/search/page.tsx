import Image from "next/image";

export default function SearchPage() {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
        Campus Map
      </h1>
      <div className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
        <Image
          src="/assets/campus-map.png"
          alt="Evanston campus map"
          width={1200}
          height={900}
          className="h-auto w-full object-contain"
          priority
        />
      </div>
    </div>
  );
}
