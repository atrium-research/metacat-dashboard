import { CSSProperties, ReactNode } from "react";
import { Typography } from "@/components/ui/Typography/Typography";
import { matrixCellVariants } from "@/components/ui/MatrixCell/MatrixCell.styles";
import { CheckIcon } from "@/components/ui/Icons/Check";

interface MatrixCellProps {
  variant: "coverage" | "heatmap";
  source: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp";
  hasValue: boolean;
  className?: string;
  textValue?: number | string;
  alpha?: number;
}

export function MatrixCell(props: Readonly<MatrixCellProps>): ReactNode {
  const { variant, alpha, source, hasValue, className, textValue } = props;

  return (
    <div
      className={matrixCellVariants({ className, variant, source, hasValue })}
      style={
        {
          "--alpha": alpha !== undefined ? `${alpha}%` : "100%",
        } as CSSProperties
      }
    >
      {hasValue && variant === "coverage" && (
        <CheckIcon className="fill-inherit" />
      )}
      {hasValue && variant === "heatmap" && (
        <Typography variant="caption">
          {(textValue ?? 0)?.toString()}
        </Typography>
      )}
      {!hasValue && <Typography variant="caption">N/A</Typography>}
    </div>
  );
}
