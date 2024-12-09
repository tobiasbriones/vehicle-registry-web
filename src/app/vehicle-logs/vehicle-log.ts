// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { Driver, emptyDriver } from "@app/drivers/driver.ts";
import { emptyVehicle, Vehicle } from "@app/vehicles/vehicle.ts";

export type VehicleLogType = "entry" | "exit";

/**
 * Defines a log when a vehicle accesses or leaves.
 */
export type VehicleLog = {
    id: number,
    vehicle: Vehicle,
    driver: Driver,
    logType: VehicleLogType;
    timestamp: Date;
    mileageInKilometers: number;
}

export type VehicleLogCreateBody = {
    vehicleNumber: string,
    driverLicenseId: string,
    logType: VehicleLogType;
    mileageInKilometers: number;
}

/**
 * Defines the style the dialog will show before sending the request,
 * allowing to show the high-level `Vehicle` and `Driver` records.
 */
export type VehicleLogFormCreateBody = {
    vehicle: Vehicle,
    driver: Driver,
    logType: VehicleLogType;
    mileageInKilometers: string;
}

export const emptyVehicleLogFormCreateBody: VehicleLogFormCreateBody = {
    vehicle: emptyVehicle,
    driver: emptyDriver,
    logType: "entry",
    mileageInKilometers: "0",
};

export const vehicleLogFormCreateBodyToApiBody = (
    { vehicle, driver, logType, mileageInKilometers }: VehicleLogFormCreateBody,
): VehicleLogCreateBody => ({
    vehicleNumber: vehicle.number,
    driverLicenseId: driver.licenseId,
    logType,
    mileageInKilometers: parseInt(mileageInKilometers),
});

export const validateVehicleLogCreate = (formVehicleLog: VehicleLogFormCreateBody) => {
    const errors: Partial<{ vehicle: string, driver: string }> = {};

    if (formVehicleLog.vehicle.number === "") {
        errors.vehicle = "Vehicle is required.";
    }

    if (formVehicleLog.driver.licenseId === "") {
        errors.driver = "Driver is required.";
    }

    return errors;
};


export type VehicleLogUpdateBody = {
    id: number,
    logType: VehicleLogType;
    mileageInKilometers: number;
};
