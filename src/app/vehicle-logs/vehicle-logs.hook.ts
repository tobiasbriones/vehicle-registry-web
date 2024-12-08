// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import {
    newVehicleLogService,
    ReadAllQueryParams,
} from "@app/vehicle-logs/vehicle-log.service.ts";
import { VehicleLog } from "@app/vehicle-logs/vehicle-log.ts";
import { useLoadingPane } from "@components/loading/loading-pane.hook.ts";
import { useCallback, useMemo, useState } from "react";

export function useVehicleLogService(
    limit?: number,
    page?: number,
    filter?: ReadAllQueryParams,
) {
    const [ logs, setLogs ] = useState<VehicleLog[]>([]);
    const {
        loadingContent,
        setLoading,
        setError,
        stopLoading,
    } = useLoadingPane();

    const service = useMemo(() => newVehicleLogService(), []);

    const fetchVehicleLogs = useCallback(() => {
        const setErrorWithMessage = (message: string) => (error: unknown) => {
            setError(`${ message } ${ String(error) }`);
        };

        setLoading("Loading vehicle logs...");

        service
            .getAllVehicleLogs(limit, page, filter)
            .then(setLogs)
            .then(stopLoading)
            .catch(setErrorWithMessage(`Failed to fetch vehicle logs.`));
    }, [ filter, limit, page, service, setError, setLoading, stopLoading ]);

    return {
        logs,
        loadingContent,
        fetchVehicleLogs,
        setLoading,
        stopLoading,
        setError,
    };
}
