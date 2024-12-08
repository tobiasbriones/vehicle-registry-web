// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { Driver } from "@app/drivers/driver.ts";
import { Vehicle } from "@app/vehicles/vehicle.ts";

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

export type VehicleLogUpdateBody = {
    id: number,
    logType: VehicleLogType;
    mileageInKilometers: number;
};
