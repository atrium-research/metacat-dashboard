import { Typography } from "@/components/ui/Typography/Typography";

const ChartNote = () => (
    <div role="note" className="flex items-center gap-2">
        <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            aria-hidden
            className="shrink-0 text-[#815C2A]"
        >
            <path
                d="M6 1.5 11 10.5H1z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1}
                strokeLinejoin="round"
            />
            <path
                d="M6 4.75v2.25"
                stroke="#fff"
                strokeWidth={1}
                strokeLinecap="round"
            />
            <circle cx={6} cy={8.75} r={0.6} fill="#fff" />
        </svg>
        <Typography variant="caption-meta" className="text-[#815C2A]">
            &quot;Note: Each chart uses its own independent scale — bar lengths
            are not directly comparable between catalogues.&quot;
        </Typography>
    </div>
);

export default ChartNote;
