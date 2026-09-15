"use client";

import { useFontSize } from "@/contexts/FontSizeContext";

function FontSizeToggle() {
  const {
    decreaseFont,
    resetFont,
    increaseFont,
    canDecrease,
    canIncrease,
    isDefault,
    isInitialized,
  } = useFontSize();

  return (
    <div
      role="group"
      aria-label="Rozmiar tekstu"
      className="h-8 inline-flex items-center gap-1 rounded-md border border-zinc-300 p-1 dark:border-zinc-700 contrast:border-yellow-400"
    >
      <button
        type="button"
        onClick={decreaseFont}
        disabled={!canDecrease}
        aria-label="Zmniejsz rozmiar tekstu"
        className="flex h-6 w-6 items-center justify-center rounded text-sm font-bold transition-colors enabled:cursor-pointer hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-40 disabled:hover:bg-transparent dark:hover:bg-zinc-800 contrast:hover:bg-yellow-400 contrast:text-primary-500 contrast:hover:text-black"
      >
        A-
      </button>

      <button
        type="button"
        onClick={resetFont}
        disabled={!isInitialized}
        aria-label="Domyślny rozmiar tekstu"
        aria-pressed={isDefault}
        className="flex h-6 w-6 items-center justify-center rounded text-sm font-bold transition-colors enabled:cursor-pointer hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 aria-pressed:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-transparent dark:hover:bg-zinc-800 dark:aria-pressed:bg-zinc-700 contrast:hover:bg-yellow-400 contrast:text-primary-500 contrast:hover:text-black contrast:aria-pressed:bg-yellow-400 contrast:aria-pressed:text-black"
      >
        A
      </button>

      <button
        type="button"
        onClick={increaseFont}
        disabled={!canIncrease}
        aria-label="Zwiększ rozmiar tekstu"
        className="flex h-6 w-6 items-center justify-center rounded text-sm font-bold transition-colors enabled:cursor-pointer hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-40 disabled:hover:bg-transparent dark:hover:bg-zinc-800 contrast:hover:bg-yellow-400 contrast:text-primary-500 contrast:hover:text-black"
      >
        A+
      </button>
    </div>
  );
}

export default FontSizeToggle;
