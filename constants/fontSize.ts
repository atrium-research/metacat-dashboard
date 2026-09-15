export const FONT_SIZES = [100, 125, 150, 200] as const;
export type FontSize = (typeof FONT_SIZES)[number];