import { systemBadgeVariants } from "@/components/ui/SystemBadge/SystemBadge.styles";
import { ReactNode } from "react";

interface SystemBadgeProps {
  variant?: "gap" | "status";
  status?: "success" | "error";
  className?: string;
  gapCount?: number;
}

export function SystemBadge(props: Readonly<SystemBadgeProps>): ReactNode {
  const { variant, status, className, gapCount } = props;

  const parseGapToText = (gap: number | undefined) => {
    if (gap === 1) return "1 gap";

    return `${gap} gaps`;
  };

  if (
    (!variant || variant === "gap") &&
    (gapCount === 0 || gapCount === undefined)
  )
    return null;

  return (
    <div className={systemBadgeVariants({ className, variant, status })}>
      {variant === "status" && (
        <>
          <span className="inline-block size-1.5 rounded-full bg-current" />
          {status}
        </>
      )}
      {(!variant || variant === "gap") && <>{parseGapToText(gapCount)}</>}
    </div>
  );
}
