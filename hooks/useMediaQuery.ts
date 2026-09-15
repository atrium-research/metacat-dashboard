"use client";

import { useState, useEffect } from "react";

interface useMediaQueryReturn {
  isSize: boolean;
  isLoading: boolean;
}

const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "3xl": "1920px",
};

export const useMediaQuery = (
  size: keyof typeof BREAKPOINTS,
): useMediaQueryReturn => {
  const [isSize, setIsSize] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsSize = () => {
      const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINTS[size]})`);

      const isPropSize = mediaQuery.matches;

      setIsSize(isPropSize);
      setIsLoading(false);
    };

    checkIsSize();

    const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINTS[size]})`);
    const handleChange = () => checkIsSize();

    mediaQuery.addEventListener("change", handleChange);
    window.addEventListener("resize", checkIsSize);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("resize", checkIsSize);
    };
  }, []);

  return {
    isSize,
    isLoading,
  };
};

export default useMediaQuery;
