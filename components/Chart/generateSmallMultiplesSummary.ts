import { components } from "@/types/api";
import { getShortName } from "@/utils/catalogue.utils";
import { formatCompactNumber } from "@/utils/global.utils";

type FacetComparisonRow = components["schemas"]["FacetComparisonRow"];

const CONCENTRATED_SHARE = 60;
const COMPARABLE_RATIO = 2;
const MAX_LISTED_GAPS = 3;

const NUMBER_WORDS = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
];

type CatalogueProfile = {
    name: string;
    total: number;
    topValue: string;
    share: number;
    missing: string[];
};

const toWord = (value: number) => NUMBER_WORDS[value] ?? String(value);

const capitalize = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1);

const joinValues = (values: string[]) => {
    if (values.length <= 2) return values.join(" and ");
    return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
};

const formatRatio = (ratio: number) =>
    ratio >= 10 ? Math.round(ratio).toLocaleString("en-US") : ratio.toFixed(1);

const toLabel = ({ name, total }: CatalogueProfile) =>
    `${name} (${formatCompactNumber(total)})`;

const buildProfile = (
    catalogue: string,
    data: FacetComparisonRow[],
): CatalogueProfile => {
    let total = 0;
    let topCount = 0;
    let topValue = "";
    const missing: string[] = [];

    for (const row of data) {
        const count = row.counts?.[catalogue];

        if (count === null || count === undefined) {
            missing.push(row.value);
            continue;
        }

        total += count;

        if (count > topCount) {
            topCount = count;
            topValue = row.value;
        }
    }

    return {
        name: getShortName(catalogue),
        total,
        topValue,
        share: total > 0 ? Math.round((topCount / total) * 100) : 0,
        missing,
    };
};

const describeDominance = (profiles: CatalogueProfile[]) => {
    const charted = profiles.filter(({ topValue }) => topValue !== "");
    const leaders = new Map<string, number>();

    for (const { topValue } of charted) {
        leaders.set(topValue, (leaders.get(topValue) ?? 0) + 1);
    }

    if (charted.length < 2) return [];

    const [value, count] = [...leaders.entries()].reduce(
        (best, entry) => (entry[1] > best[1] ? entry : best),
        ["", 0] as [string, number],
    );

    if (value === "") return [];

    if (count === charted.length) {
        return [
            `${capitalize(value)} dominates all ${toWord(count)} catalogues`,
        ];
    }

    if (count === 1) {
        return ["Every catalogue peaks on a different value"];
    }

    return [
        `${capitalize(value)} leads in ${toWord(count)} of ${toWord(charted.length)} catalogues`,
    ];
};

const groupByTopValue = (profiles: CatalogueProfile[]) => {
    const groups = new Map<string, CatalogueProfile[]>();

    for (const profile of profiles) {
        groups.set(profile.topValue, [
            ...(groups.get(profile.topValue) ?? []),
            profile,
        ]);
    }

    return [...groups.entries()];
};

const describeShapes = (profiles: CatalogueProfile[]) => {
    const charted = profiles.filter(({ total }) => total > 0);
    const spread = charted.filter(({ share }) => share < CONCENTRATED_SHARE);
    const concentrated = charted.filter(
        ({ share }) => share >= CONCENTRATED_SHARE,
    );

    const spreadSentences =
        spread.length > 1
            ? [
                  `${joinValues(spread.map(toLabel))} have no single dominant value`,
              ]
            : spread.map(
                  (profile) =>
                      `${toLabel(profile)} has no single dominant value`,
              );

    const concentratedSentences = groupByTopValue(concentrated).map(
        ([topValue, group]) =>
            group.length > 1
                ? `${joinValues(group.map(toLabel))} are heavily concentrated in ${topValue}`
                : `${toLabel(group[0])} is heavily concentrated in ${topValue}`,
    );

    const emptySentences: string[] = [];
    for (const { total, name } of profiles) {
        if (total !== 0) continue;

        emptySentences.push(
            `${name} has no values left above the active Min count filter`,
        );
    }

    return [...spreadSentences, ...concentratedSentences, ...emptySentences];
};

const describeGaps = (profiles: CatalogueProfile[], valueCount: number) => {
    const withGaps = profiles.filter(({ missing }) => missing.length > 0);
    if (withGaps.length === 0) return [];

    if (withGaps.length === 1) {
        const [only] = withGaps;

        return [
            only.missing.length <= MAX_LISTED_GAPS
                ? `${toLabel(only)} lacks ${joinValues(only.missing)} entirely (N/A)`
                : `${toLabel(only)} has no data for ${only.missing.length} of the ${valueCount} values shown (N/A)`,
        ];
    }

    const [leadGap, ...otherGaps] = withGaps;
    const shares = [
        `${leadGap.name} has no data for ${leadGap.missing.length} of the ${valueCount} values shown`,
        ...otherGaps.map(
            ({ name, missing }) => `${name} for ${missing.length}`,
        ),
    ];

    return [`Coverage is uneven: ${joinValues(shares)} (N/A)`];
};

const describeScales = (profiles: CatalogueProfile[]) => {
    const charted = profiles.filter(({ total }) => total > 0);
    if (charted.length < 2) return [];

    const largest = charted[0];
    const smallest = charted[charted.length - 1];
    const ratio = largest.total / smallest.total;

    if (ratio < COMPARABLE_RATIO) {
        return [
            "The catalogues sit at a comparable magnitude, so the independent scales stay close to each other",
        ];
    }

    return [
        `The independent scales make distribution shapes comparable despite ${largest.name} being ~${formatRatio(ratio)}× larger than ${smallest.name}`,
    ];
};

export const generateSmallMultiplesSummary = (
    data: FacetComparisonRow[],
    catalogueIds: string[],
): string => {
    if (data.length === 0 || catalogueIds.length === 0) {
        return "No facet values match the current filters.";
    }

    const profiles = catalogueIds
        .map((catalogue) => buildProfile(catalogue, data))
        .sort((a, b) => b.total - a.total);

    const sentences = [
        "Each catalogue is charted on its own scale, revealing the shape of each distribution independently",
        ...describeDominance(profiles),
        ...describeShapes(profiles),
        ...describeGaps(profiles, data.length),
        ...describeScales(profiles),
    ];

    return `Small Multiples View: ${sentences.join(". ")}.`;
};
