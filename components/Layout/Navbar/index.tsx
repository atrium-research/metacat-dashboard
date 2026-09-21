"use client";
import { Typography } from "@/components/ui/Typography/Typography";
import { Tag, TagGroup } from "@/components/ui/TagGroup/TagGroup";
import SidebarToggle from "@/components/Layout/Sidebar/SidebarToggle";
import ExportMenu from "@/components/Layout/Navbar/ExportMenu";
import SearchInput from "@/components/Layout/Navbar/SearchInput";
import { useCatalogueList } from "@/hooks/useCatalogues";
import { useBackupLastUpdate } from "@/hooks/useBackup";
import { getThemeColor } from "@/utils/catalogue.utils";
import { formatDateToFullString } from "@/utils/date.utils";
import { Link } from "react-aria-components"

const Navbar = () => {
    const { data: catalogues } = useCatalogueList();
    const { data: lastUpdate } = useBackupLastUpdate();
    const snapshotLabel = lastUpdate?.last_update
        ? formatDateToFullString(new Date(lastUpdate.last_update))
        : "N/A";

    return (
        <nav
            aria-label="Top navigation"
            className={
                "sticky top-0 z-30 w-full border-b border-beige-600 bg-white-500 flex flex-col gap-3 px-4 py-2.5 sm:px-6 md:px-8 md:py-[10.5px] xl:flex-row xl:items-center xl:gap-6"
            }
        >
            <div className="flex items-center gap-2 sm:gap-3 xl:contents">
                <SidebarToggle className="shrink-0 md:hidden" />

                <SearchInput />

                <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-6 xl:order-3 xl:ml-0">
                    {snapshotLabel && lastUpdate?.last_update ? (
                        <time
                            dateTime={lastUpdate.last_update}
                            className="hidden text-gray-500 md:block uppercase text-body-control font-jetbrains-mono"
                            aria-label={`Snapshot from ${snapshotLabel}`}
                        >
                            <Link
                                href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/backup/page`}
                                target="_blank"
                                aria-label="Snapshot page"
                                className="hover:underline"
                            >
                                SNAPSHOT {snapshotLabel}
                            </Link>
                        </time>
                    ) : (
                        <Typography
                            variant="body-control"
                            className="hidden text-gray-500 md:block uppercase"
                            aria-label="Snapshot date unavailable"
                        >
                            SNAPSHOT
                        </Typography>
                    )}

                    <ExportMenu />
                </div>
            </div>

            <div className="flex min-w-0 items-center gap-3 xl:order-2 xl:min-w-0 xl:flex-1">
                <Typography
                    variant="body-control"
                    className="shrink-0 text-gray-500"
                >
                    COMPARE
                </Typography>
                <div className="min-w-0 flex-1 xl:-m-1 xl:p-1">
                    <TagGroup
                        aria-label="Compare catalogues"
                        selectionMode="multiple"
                        className="min-w-0 xl:w-max xl:[&>div]:flex-nowrap"
                    >
                        {catalogues?.map((cat) => (
                            <Tag
                                key={cat.id}
                                id={cat.id}
                                color={`var(--color-${getThemeColor(cat.id)})`}
                                textValue={cat.id}
                            >
                                {cat.id}
                            </Tag>
                        ))}
                    </TagGroup>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
