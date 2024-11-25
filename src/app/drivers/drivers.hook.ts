// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { newDriverService } from "@app/drivers/driver.service.ts";
import { Driver, emptyDriver } from "@app/drivers/driver.ts";
import { useLoadingPane } from "@components/loading/loading-pane.hook.ts";
import { useCallback, useMemo, useState } from "react";

export function useDriverService(limit?: number, page?: number) {
    const [ drivers, setDrivers ] = useState<Driver[]>([]);
    const {
        loadingContent,
        setLoading,
        setError,
        stopLoading,
    } = useLoadingPane();

    const service = useMemo(() => newDriverService(), []);

    const fetchDrivers = useCallback(() => {
        const setErrorWithMessage = (message: string) => (error: unknown) => {
            setError(`${ message } ${ String(error) }`);
        };

        setLoading("Loading drivers...");

        service
            .getAllDrivers(limit, page)
            .then(setDrivers)
            .then(stopLoading)
            .catch(setErrorWithMessage(`Failed to fetch drivers.`));
    }, [ limit, page, service, setError, setLoading, stopLoading ]);

    const registerDriver = useCallback(
        (driver: Driver) => {
            setLoading("Creating driver...");

            service
                .addDriver(driver)
                .then((res: Driver) => {
                    setDrivers(prevDrivers => [ res, ...prevDrivers ]);
                })
                .then(stopLoading)
                .catch(setError);
        },
        [ service, setError, setLoading, stopLoading ],
    );

    const editDriver = useCallback(
        (driver: Driver) => {
            setLoading("Updating driver...");

            service
                .updateDriver(driver)
                .then((res: Driver) => {
                    setDrivers(prevDrivers => prevDrivers
                        .map(v => v.licenseId === res.licenseId ? res : v),
                    );
                })
                .then(stopLoading)
                .catch(setError);
        },
        [ service, setError, setLoading, stopLoading ],
    );

    const deleteDriver = useCallback(
        (driver: Driver) => {
            setLoading("Deleting driver...");

            service
                .deleteDriver(driver.licenseId)
                .then(() => {
                    setDrivers(prevDrivers => prevDrivers.filter(
                        v => v.licenseId !== driver.licenseId,
                    ));
                })
                .then(stopLoading)
                .catch(setError);
        },
        [ service, setError, setLoading, stopLoading ],
    );

    return {
        drivers,
        loadingContent,
        fetchDrivers,
        registerDriver,
        editDriver,
        deleteDriver,
    };
}

export function useDriverDialog() {
    const [ isDialogVisible, setIsDialogVisible ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ selectedDriver, setSelectedDriver ]
        = useState<Driver | undefined>(undefined);

    const openNewDriverDialog = () => {
        setSelectedDriver(emptyDriver);
        setIsEditing(false);
        setIsDialogVisible(true);
    };

    const openEditDriverDialog = (driver: Driver) => {
        setSelectedDriver(driver);
        setIsEditing(true);
        setIsDialogVisible(true);
    };

    const hideDialog = () => {
        setIsDialogVisible(false);
        setSelectedDriver(undefined);
    };

    return {
        isDialogVisible,
        isEditing,
        selectedDriver,
        openNewDriverDialog,
        openEditDriverDialog,
        hideDialog,
    };
}
