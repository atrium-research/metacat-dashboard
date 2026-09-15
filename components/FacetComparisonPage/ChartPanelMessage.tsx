import { Typography } from "@/components/ui/Typography/Typography";

type ChartPanelMessageProps = {
    message: string;
};

const ChartPanelMessage = ({ message }: ChartPanelMessageProps) => (
    <div className="flex h-full items-center justify-center">
        <Typography variant="caption-meta" className="text-gray-500">
            {message}
        </Typography>
    </div>
);

export default ChartPanelMessage;
