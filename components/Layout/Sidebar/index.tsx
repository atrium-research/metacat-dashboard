"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as LinkAria} from "react-aria-components";
import { Button } from "react-aria-components/Button";
import { Dialog } from "react-aria-components/Dialog";
import { Modal, ModalOverlay } from "react-aria-components/Modal";
import { Typography } from "@/components/ui/Typography/Typography";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/utils/global.utils";
import { urls } from "@/utils/urls";

const links = [
    {
        label: "Overview",
        href: urls.overview,
    },
    {
        label: "Facet comparison",
        href: urls.facetComparison,
    },
    {
        label: "Vocabularies & Mappings",
        href: urls.vocabulariesAndMappings,
    },
    {
        label: "Catalogue detail",
        href: urls.catalogueDetail,
    },
];

type SidebarContentProps = {
    onNavigate?: () => void;
};

const SidebarContent = (props: Readonly<SidebarContentProps>) => {
    const { onNavigate } = props;
    const pathname = usePathname();

    return (
        <>
            <div>
                <div className="flex flex-col gap-1 pl-6">
                    <Typography
                        variant="h3"
                        className="flex items-center gap-1.5"
                    >
                        <span
                            aria-hidden="true"
                            className="text-ariadne text-lg"
                        >
                            ✣
                        </span>
                        MetaCat
                    </Typography>
                    <Typography
                        variant="caption"
                        className="text-gray-500 uppercase"
                    >
                        Atrium · WP3
                    </Typography>
                </div>

                <nav aria-label="Main navigation" className="mt-6">
                    <ul className="list-none p-0 m-0">
                        {links.map(({ label, href }) => {
                            const isActive = pathname === href;

                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                        onClick={onNavigate}
                                        className="block py-2.5 my-0.5 hover:bg-white-500 focus:outline-none focus-visible:border-2 focus-visible:border-primary group"
                                    >
                                        <Typography
                                            variant="caption-link"
                                            as="span"
                                            className={cn(
                                                "pl-6 border-l-2 group-hover:font-semi-bold group-hover:text-black-500",
                                                isActive
                                                    ? "border-ariadne"
                                                    : "border-transparent font-normal text-gray-500",
                                            )}
                                        >
                                            {label}
                                        </Typography>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            <div className="pl-6">
                <Typography className="text-[9px]">Knowledge Graph</Typography>
                <div className="mt-2">
                    <Typography className="text-[9px]">
                        GraphDB · EOSC
                    </Typography>
                    <Typography className="text-[9px]">
                        AO-Cat 1.4 · CIDOC CRM 7.1.1
                    </Typography>
                </div>
                <div className="mt-2">
                    <LinkAria
                        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/docs`}
                        target="_blank"
                        aria-label="MetaCat API Documentation"
                        className="text-caption text-gray-500 hover:underline"
                    >
                        MetaCat API
                    </LinkAria>
                </div>
            </div>
        </>
    );
};

const Sidebar = () => {
    const { isOpen, setIsOpen, close } = useSidebar();
    const pathname = usePathname();

    useEffect(() => {
        close();
    }, [pathname, close]);

    return (
        <>
            <aside
                aria-label="Sidebar"
                className="hidden md:flex fixed inset-y-0 left-0 z-40 w-60 flex-col justify-between overflow-y-auto border-r border-beige-600 bg-white-500 py-8"
            >
                <SidebarContent />
            </aside>
            <div className="hidden md:block w-60 shrink-0" aria-hidden="true" />

            <ModalOverlay
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                isDismissable
                className={"fixed inset-0 z-50 flex bg-black-900/40 md:hidden transition-opacity duration-200 ease-out motion-reduce:transition-none data-entering:opacity-0 data-exiting:opacity-0"}
            >
                <Modal
                    className={
                        "h-full w-64 max-w-[80vw] border-r border-beige-600 bg-white-500 shadow-lg transition-transform duration-200 ease-out motion-reduce:transition-none data-entering:-translate-x-full data-exiting:-translate-x-full"
                    }
                >
                    <Dialog
                        aria-label="Sidebar"
                        className="relative flex h-full flex-col justify-between overflow-y-auto py-8 outline-none"
                    >
                        <Button
                            aria-label="Close navigation"
                            onPress={close}
                            className={"absolute top-6 right-3 flex size-8 items-center justify-center rounded-sm cursor-pointer border border-transparent text-gray-500 data-hovered:border-beige-600 data-hovered:text-black-500 data-focus-visible:outline-2 data-focus-visible:outline-primary"}
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
                                <path d="M6 6l12 12" />
                                <path d="M18 6l-12 12" />
                            </svg>
                        </Button>

                        <SidebarContent onNavigate={close} />
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </>
    );
};

export default Sidebar;
