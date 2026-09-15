"use client";

import { Button } from "react-aria-components/Button";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/utils/global.utils";

type SidebarToggleProps = {
  className?: string;
};

const SidebarToggle = (props: Readonly<SidebarToggleProps>) => {
  const { className } = props;
  const { isOpen, toggle } = useSidebar();

  return (
    <Button
      aria-label="Open navigation"
      aria-expanded={isOpen}
      onPress={toggle}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-sm cursor-pointer",
        "border border-beige-600 bg-white-500 text-black-500",
        "data-hovered:bg-beige-400",
        "data-pressed:border-primary",
        "data-focus-visible:outline-2 data-focus-visible:outline-primary",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="size-4.5"
      >
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    </Button>
  );
};

export default SidebarToggle;
