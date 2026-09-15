"use client";

import { createContext, ReactNode, startTransition, useContext, useEffect, useState } from "react";
import { FONT_SIZES, FontSize } from "@/constants/fontSize";

type FontSizeContextType = {
  currentSize: FontSize;
  sizeIndex: number;
  decreaseFont: () => void;
  resetFont: () => void;
  increaseFont: () => void;
  canDecrease: boolean;
  canIncrease: boolean;
  isDefault: boolean;
  isInitialized: boolean;
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(
  undefined,
);

type FontSizeProviderProps = {
  children: ReactNode;
};

// language=javascript
const FONT_SIZE_SCRIPT = `
  (function() {
    try {
      const saved = localStorage.getItem('font-scale');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if ([${FONT_SIZES.join(",")}].indexOf(parsed) !== -1) {
          document.documentElement.style.fontSize = parsed + '%';
        }
      }
    } catch (e) {}
  })();
`;

export function FontSizeProvider(props: FontSizeProviderProps) {
  const { children } = props;
  const [currentSize, setCurrentSize] = useState<FontSize>(100);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("font-scale");
    if (saved) {
      const parsed = parseInt(saved, 10);
      const isNumber = !isNaN(parsed);
      const isProperFontSize = (FONT_SIZES as readonly number[]).includes(parsed);

      if (isNumber && isProperFontSize) {
        startTransition(() => {
          setCurrentSize(parsed as FontSize);
        });
      }
    }

    startTransition(() => {
      setIsInitialized(true);
    });
  }, []);

  const changeSize = (newSize: FontSize) => {
    setCurrentSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem("font-scale", newSize.toString());
  };

  const sizeIndex = FONT_SIZES.indexOf(currentSize);

  const decreaseFont = () => {
    if (sizeIndex > 0) {
      changeSize(FONT_SIZES[sizeIndex - 1]);
    }
  };

  const resetFont = () => {
    changeSize(100);
  };

  const increaseFont = () => {
    if (sizeIndex < FONT_SIZES.length - 1) {
      changeSize(FONT_SIZES[sizeIndex + 1]);
    }
  };

  const value: FontSizeContextType = {
    currentSize,
    sizeIndex,
    decreaseFont,
    resetFont,
    increaseFont,
    canDecrease: isInitialized && sizeIndex > 0,
    canIncrease: isInitialized && sizeIndex < FONT_SIZES.length - 1,
    isDefault: sizeIndex === 0,
    isInitialized,
  };

  return (
    <FontSizeContext.Provider value={value}>
      <script
        dangerouslySetInnerHTML={{
          __html: FONT_SIZE_SCRIPT,
        }}
      />
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
}
