import { cva } from "class-variance-authority";

export const systemBadgeVariants = cva("cursor-default", {
    variants: {
        variant: {
            gap: "py-1 px-2 rounded-lg bg-beige-600 text-caption text-[0.625rem] text-gray-700 uppercase font-jetbrains-mono font-bold",
            status: "flex gap-1.5 text-body font-semibold text-[0.8125rem] bg-transparent items-center capitalize",
        },
        status: {
            live: "[&>span]:bg-status-live text-black-500",
            error: "[&>span]:bg-primary text-primary",
        },
    },
    defaultVariants: {
        variant: "gap",
    },
});
