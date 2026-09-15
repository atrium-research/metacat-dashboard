import { cookies } from "next/headers";
import { FONT_SIZES, FontSize } from "@/constants/fontSize";

export async function getInitialFontSize(): Promise<FontSize> {
  const cookieStore = await cookies();
  const fontScaleCookie = cookieStore.get("font-scale")?.value;
  const parsedSize = fontScaleCookie ? parseInt(fontScaleCookie, 10) : 100;
  const isNumber = !isNaN(parsedSize);
  const isProperFontSize = (FONT_SIZES as readonly number[]).includes(parsedSize);

  if (isNumber && isProperFontSize) {
    return parsedSize as FontSize;
  }

  return 100;
}
