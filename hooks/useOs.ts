"use client";

import { useSyncExternalStore } from "react";

export type Os = "Mac" | "Windows" | "Linux" | "Other" | undefined;

const getClientOs = (): Os => {
    const userAgent = window.navigator.userAgent ?? "";
    if (/Mac|iPhone|iPad|iPod/i.test(userAgent)) return "Mac";
    if (/Win/i.test(userAgent)) return "Windows";
    if (/Linux/i.test(userAgent)) return "Linux";
    return "Other";
};

const getServerOs = (): Os => undefined;

const subscribe = (): (() => void) => () => { };

export const useOs = (): Os =>
    useSyncExternalStore(subscribe, getClientOs, getServerOs);
