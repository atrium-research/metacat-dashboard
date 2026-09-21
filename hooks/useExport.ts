import apiInstance from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

const AO_CAT_FILENAME = "ao_cat.ttl";

export const exportKeys = {
    aoCat: () => ["export", "ao-cat"],
};

export const exportEndpoints = {
    aoCat: () => "/export/ao-cat",
};

const triggerBrowserDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    link.click();
    URL.revokeObjectURL(url);
};

const fetchAoCatExport = async (): Promise<Blob> => {
    const { data } = await apiInstance.get<Blob>(exportEndpoints.aoCat(), {
        responseType: "blob",
    });
    return data;
};

export const useExportAoCat = () => {
    return useMutation({
        mutationKey: exportKeys.aoCat(),
        mutationFn: async () => {
            const blob = await fetchAoCatExport();
            triggerBrowserDownload(blob, AO_CAT_FILENAME);
            return blob;
        },
        retry: false,
    });
};
