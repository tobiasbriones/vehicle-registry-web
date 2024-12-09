// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { newDriverService } from "@app/drivers/driver.service.ts";
import { Driver } from "@app/drivers/driver.ts";
import { newVehicleService } from "@app/vehicles/vehicle.service.ts";
import { Vehicle } from "@app/vehicles/vehicle.ts";
import { useCallback, useMemo, useState } from "react";

export function useVehicleLogDataServices(
    setLoading: (message: string) => void,
    setError: (message: unknown) => void,
    stopLoading: () => void,
) {
    const limit = 100;
    const page = 1;

    const vehicleService = useMemo(() => newVehicleService(), []);
    const [ vehicles, setVehicles ] = useState<Vehicle[]>([]);

    const driverService = useMemo(() => newDriverService(), []);
    const [ drivers, setDrivers ] = useState<Driver[]>([]);

    const fetchVehicles = useCallback(() => {
        const setErrorWithMessage = (message: string) => (error: unknown) => {
            setError(`${ message } ${ String(error) }`);
        };

        setLoading("Loading vehicles...");

        vehicleService
            .getAllVehicles(limit, page)
            .then(setVehicles)
            .then(stopLoading)
            .catch(setErrorWithMessage(`Failed to fetch vehicles.`));
    }, [ setError, setLoading, stopLoading, vehicleService ]);

    const fetchDrivers = useCallback(() => {
        const setErrorWithMessage = (message: string) => (error: unknown) => {
            setError(`${ message } ${ String(error) }`);
        };

        setLoading("Loading drivers...");

        driverService
            .getAllDrivers(limit, page)
            .then(setDrivers)
            .then(stopLoading)
            .catch(setErrorWithMessage(`Failed to fetch drivers.`));
    }, [ driverService, setError, setLoading, stopLoading ]);

    return {
        vehicles,
        fetchVehicles,
        drivers,
        fetchDrivers,
    };
}
