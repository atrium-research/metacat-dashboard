"use client";

import dynamic from "next/dynamic";
import ThemeToggle from "@/components/ToggleTheme/ThemeToggle";

const ThemeSelect = dynamic(() => import("@/components/ToggleTheme/ThemeToggle"), {
  ssr: false,
  loading: () => <ThemeToggle isLoading />,
});

export default ThemeSelect;
