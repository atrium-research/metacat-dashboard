import type { BarCustomLayerProps } from "@nivo/bar";
import {
    GAP_FILL_COLOR,
    GAP_TEXT_COLOR,
    type BarChartDatum,
} from "@/components/Chart/BarChart/BarChartConfig";

type GapMarkersProps = BarCustomLayerProps<BarChartDatum> & {
    isGap: (rowValue: string, catalogueId: string) => boolean;
};

const MIN_LABELLED_GAP_HEIGHT = 8;

const GapMarkers = ({ bars, isGap }: GapMarkersProps) => (
    <g>
        {bars.flatMap((bar) => {
            const indexValue = String(bar.data.indexValue);
            const catalogueId = String(bar.data.id);

            if (!isGap(indexValue, catalogueId)) return [];

            return (
                <g
                    key={`${indexValue}-${catalogueId}`}
                    transform={`translate(${bar.x}, ${bar.y})`}
                >
                    <rect
                        width={44}
                        height={bar.height}
                        fill={GAP_FILL_COLOR}
                    />
                    {bar.height >= MIN_LABELLED_GAP_HEIGHT && (
                        <text
                            x={8}
                            y={bar.height / 2}
                            dominantBaseline="central"
                            textAnchor="start"
                            fontFamily="var(--font-jetbrains-mono)"
                            fontSize="0.5rem"
                            fontWeight={500}
                            fill={GAP_TEXT_COLOR}
                        >
                            N/A
                        </text>
                    )}
                </g>
            );
        })}
    </g>
);

export default GapMarkers;
