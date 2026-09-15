import { components } from "@/types/api";

const CATALOGUE_THEME_COLOR = {
  ariadne: "ariadne",
  "clarin-vlo": "clarin",
  gotriple: "gotriple",
  sshomp: "sshomp",
};

const TEMP_HEADING_DESCRIPTION = {
  ariadne: "Archaeological Research",
  "clarin-vlo": "Linguistics & Language",
  gotriple: "Social Sciences & Humanities",
  sshomp: "SSH Open Marketplace",
};

const CATALOGUE_SHORT_NAMES = {
  ariadne: "ARIADNE",
  "clarin-vlo": "CLARIN",
  gotriple: "GoTriple",
  sshomp: "SSHOMP",
};

export const getThemeColor = (id: string) => {
  return CATALOGUE_THEME_COLOR[id as keyof typeof CATALOGUE_THEME_COLOR] ?? "gray-500";
};

export const getHeadingDescription = (id: string) => {
  return TEMP_HEADING_DESCRIPTION[id as keyof typeof TEMP_HEADING_DESCRIPTION];
};

export const getShortName = (id: string) => {
  return CATALOGUE_SHORT_NAMES[id as keyof typeof CATALOGUE_SHORT_NAMES] ?? id;
};

export const getUrlDisplayName = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

export const getCoverageCount = (coverage: {
  [key: string]: components["schemas"]["FacetExposureStatus"];
}) => {
  return Object.values(coverage).filter((status) => status === "exposed")
    .length;
};
