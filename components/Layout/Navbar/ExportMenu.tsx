"use client";

import { type Key } from "react-aria-components";
import { Button } from "@/components/ui/Button/Button";
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/Menu/Menu";
import { useExportAoCat } from "@/hooks/useExport";

const exportOptions = ["csv", "json", "png", "ttl"] as const;

const ExportMenu = () => {
    const { mutate, isPending, isError } = useExportAoCat();

    const handleExport = (key: Key) => {
        switch (key) {
            case "csv":
            case "json":
            case "png":
            case "ttl":
                mutate();
                break;
            default:
                break;
        }
    };

    return (
        <>
            <MenuTrigger>
                <Button
                    className="text-caption py-1.5! w-18! font-jetbrains-mono"
                    isDisabled={isPending}
                    aria-busy={isPending}
                    aria-label={isPending ? "Exporting AO-Cat data" : "Export AO-Cat data"}
                >
                    EXPORT
                </Button>
                <Menu aria-label="Export format" onAction={handleExport}>
                    {exportOptions.map((option) => (
                        <MenuItem key={option} id={option} className="border-b border-beige-600 last:border-b-0 rounded-none px-3 py-2 font-jetbrains-mono font-medium uppercase text-center">
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </MenuTrigger>
            {isError ? (
                <span className="sr-only" role="alert">
                    Export failed. Try again.
                </span>
            ) : null}
        </>
    );
};

export default ExportMenu;
