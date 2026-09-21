import apiInstance, { safeFetch } from "@/services/axios";
import { components } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const backupKeys = {
    lastUpdate: () => ["backup", "last-update"],
    lastUpdateInfo: () => ["backup", "last-update-info"],
};

export const backupEndpoints = {
    lastUpdate: () => "/backup/last-update",
    lastUpdateInfo: () => "/backup/last-update-info",
};

export const backupQueryOptions = {
    lastUpdate: () =>
        queryOptions({
            queryKey: backupKeys.lastUpdate(),
            queryFn: (): Promise<
                components["schemas"]["BackupLastUpdate"] | null
            > =>
                safeFetch(
                    () =>
                        apiInstance.get<
                            components["schemas"]["BackupLastUpdate"]
                        >(backupEndpoints.lastUpdate()),
                    null,
                ),
            networkMode: "always",
            retry: false,
        }),
    lastUpdateInfo: () =>
        queryOptions({
            queryKey: backupKeys.lastUpdateInfo(),
            queryFn: (): Promise<components["schemas"]["BackupInfo"] | null> =>
                safeFetch(
                    () =>
                        apiInstance.get<components["schemas"]["BackupInfo"]>(
                            backupEndpoints.lastUpdateInfo(),
                        ),
                    null,
                ),
            networkMode: "always",
            retry: false,
        }),
};

export const useBackupLastUpdate = () => {
    return useQuery(backupQueryOptions.lastUpdate());
};

export const useBackupLastUpdateInfo = () => {
    return useQuery(backupQueryOptions.lastUpdateInfo());
};
