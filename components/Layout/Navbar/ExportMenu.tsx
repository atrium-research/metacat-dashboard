import { type Key } from "react-aria-components";
import { Button } from "@/components/ui/Button/Button";
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/Menu/Menu";

const exportOptions = ["csv", "json", "png"];

const handleExport = (key: Key) => {
    switch (key) {
        case "csv":
            console.log("CSV");
            break;
        case "json":
            console.log("JSON");
            break;
        case "png":
            console.log("PNG");
            break;
        default:
            console.log("Invalid option");
            break;
    }
};

const ExportMenu = () => {
    return (
        <MenuTrigger>
            <Button className="text-caption py-1.5! w-18! font-jetbrains-mono">
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
    );
};

export default ExportMenu;
