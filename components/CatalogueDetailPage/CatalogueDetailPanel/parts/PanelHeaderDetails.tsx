import { SystemBadge } from "@/components/ui/SystemBadge/SystemBadge";
import { Typography } from "@/components/ui/Typography/Typography";

interface PanelHeaderDetailsProps {
  label: string;
  value?: string | number;
  formattedValue?: string | number;
}

const PanelHeaderDetails = ({
  label,
  value,
  formattedValue,
}: PanelHeaderDetailsProps) => {
  return (
    <div className="flex gap-3 sm:items-center h-fit max-sm:flex-col max-sm:gap-2">
      <Typography
        className="text-[0.5625rem] uppercase text-gray-500 leading-3 w-30"
        variant="caption"
      >
        {label}
      </Typography>
      {label.toLowerCase() === "status" ? (
        <SystemBadge
          variant="status"
          status={
            formattedValue === "success" || formattedValue === "error"
              ? formattedValue
              : undefined
          }
        />
      ) : (
        <Typography
          as="p"
          className="text-[0.875rem] text-black-500 leading-4.5"
          variant="h5"
        >
          {formattedValue}
        </Typography>
      )}
      {value && (
        <>
          <Typography
            as="p"
            className="text-[0.75rem] font-regular text-gray-500 leading-3.75 max-sm:hidden"
            variant="h5"
          >
            ·
          </Typography>
          <Typography
            className="text-[0.6875rem] text-gray-500 leading-3.75"
            variant="caption-meta"
          >
            {value}
          </Typography>
        </>
      )}
    </div>
  );
};

export default PanelHeaderDetails;
