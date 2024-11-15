// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { newVehicleService } from "@app/vehicles/vehicle.service.ts";
import { Vehicle } from "@app/vehicles/vehicle.ts";
import { useLoadingPane } from "@components/loading/loading-pane.hook.ts";
import { useCallback, useMemo, useState } from "react";

export function useVehicleService(limit?: number, page?: number) {
    const [ vehicles, setVehicles ] = useState<Vehicle[]>([]);
    const {
        loadingContent,
        setLoading,
        setError,
        stopLoading,
    } = useLoadingPane();

    const service = useMemo(() => newVehicleService(), []);

    const fetchVehicles = useCallback(() => {
        const setErrorWithMessage = (message: string) => (error: unknown) => {
            setError(`${ message } ${ String(error) }`);
        };

        setLoading("Loading vehicles...");

        service
            .getAllVehicles(limit, page)
            .then(setVehicles)
            .then(stopLoading)
            .catch(setErrorWithMessage(`Failed to fetch vehicles.`));
    }, [ limit, page, service, setError, setLoading, stopLoading ]);

    const registerVehicle = useCallback(
        (vehicle: Vehicle) => {
            setLoading("Creating vehicle...");

            service
                .addVehicle(vehicle)
                .then((res: Vehicle) => {
                    setVehicles(prevVehicles => [ res, ...prevVehicles ]);
                })
                .then(stopLoading)
                .catch(setError);
        },
        [ service, setError, setLoading, stopLoading ],
    );

    const editVehicle = useCallback(
        (vehicle: Vehicle) => {
            setLoading("Updating vehicle...");

            service
                .updateVehicle(vehicle)
                .then((res: Vehicle) => {
                    setVehicles(prevVehicles => prevVehicles
                        .map(v => v.number === res.number ? res : v),
                    );
                })
                .then(stopLoading)
                .catch(setError);
        },
        [ service, setError, setLoading, stopLoading ],
    );

    const deleteVehicle = useCallback(
        (vehicle: Vehicle) => {
            setLoading("Deleting vehicle...");

            service
                .deleteVehicle(vehicle.number)
                .then(() => {
                    setVehicles(prevVehicles => prevVehicles.filter(
                        v => v.number !== vehicle.number,
                    ));
                })
                .then(stopLoading)
                .catch(setError);
        },
        [ service, setError, setLoading, stopLoading ],
    );

    return {
        vehicles,
        loadingContent,
        fetchVehicles,
        registerVehicle,
        editVehicle,
        deleteVehicle,
    };
}

export function useVehicleDialog() {
    const [ isDialogVisible, setIsDialogVisible ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ selectedVehicle, setSelectedVehicle ]
        = useState<Vehicle | null>(null);

    const openNewVehicleDialog = () => {
        setSelectedVehicle({ number: "", brand: "", model: "" });
        setIsEditing(false);
        setIsDialogVisible(true);
    };

    const openEditVehicleDialog = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setIsEditing(true);
        setIsDialogVisible(true);
    };

    const hideDialog = () => {
        setIsDialogVisible(false);
        setSelectedVehicle(null);
    };

    return {
        isDialogVisible,
        isEditing,
        selectedVehicle,
        openNewVehicleDialog,
        openEditVehicleDialog,
        hideDialog,
    };
}
