// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import {
    newVehicleLogService,
    ReadAllQueryParams,
} from "@app/vehicle-logs/vehicle-log.service.ts";
import {
    VehicleLog,
    VehicleLogCreateBody,
} from "@app/vehicle-logs/vehicle-log.ts";
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

    const registerVehicleLog = useCallback(
        (log: VehicleLogCreateBody) => {
            setLoading("Creating vehicle log...");

            service
                .addVehicleLog(log)
                .then((res: VehicleLog) => {
                    setLogs(prevVehicles => [ res, ...prevVehicles ]);
                })
                .then(stopLoading)
                .catch(setError);
        },
        [ service, setError, setLoading, stopLoading ],
    );

    const deleteVehicleLog = useCallback(
        (log: VehicleLog) => {
            setLoading("Deleting vehicle log...");

            service
                .deleteVehicleLog(log.id)
                .then(() => {
                    setLogs(prevVehicles => prevVehicles.filter(
                        v => v.id !== log.id,
                    ));
                })
                .then(stopLoading)
                .catch(setError);
        },
        [ service, setError, setLoading, stopLoading ],
    );

    return {
        logs,
        loadingContent,
        fetchVehicleLogs,
        registerVehicleLog,
        deleteVehicleLog,
        setLoading,
        stopLoading,
        setError,
    };
}

export function useVehicleLogDialog() {
    const [ isDialogVisible, setIsDialogVisible ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ selectedVehicleLog, setSelectedVehicleLog ]
        = useState<VehicleLog | null>(null);

    const openNewVehicleLogDialog = () => {
        setSelectedVehicleLog(null);
        setIsEditing(false);
        setIsDialogVisible(true);
    };

    const openEditVehicleLogDialog = (log: VehicleLog) => {
        setSelectedVehicleLog(log);
        setIsEditing(true);
        setIsDialogVisible(true);
    };

    const hideDialog = () => {
        setIsDialogVisible(false);
        setSelectedVehicleLog(null);
    };

    return {
        isDialogVisible,
        isEditing,
        selectedVehicleLog,
        openNewVehicleLogDialog,
        openEditVehicleLogDialog,
        hideDialog,
    };
}
