import { components } from "@/types/api";

export const ARIADNE_CATALOGUE = {
  id: "ariadne",
  name: "ARIADNE Portal",
  domain: "Archaeology",
  url: "https://portal.ariadne-infrastructure.eu/",
  total_resources: 3142897,
  vocabularies_count: 14,
  vocabularies_mapped: 9,
  licence: "CC-BY 4.0",
  last_harvest_at: "2026-05-03T02:14:00Z",
  harvest_status: "live",
  languages_summary:
    "Primarily English, with national-language records across European partners.",
} as components["schemas"]["Catalogue"];

export const ARIADNE_COVERAGE = {
  "resource-type": "exposed",
  format: "exposed",
  discipline: "implicit",
  source: "exposed",
  "source-2": "exposed",
  subjects: "exposed",
} as {
  [key: string]: components["schemas"]["FacetExposureStatus"];
};

export const ARIADNE_CARD = {
  ...ARIADNE_CATALOGUE,
  coverage: ARIADNE_COVERAGE,
};
