// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { apiUrl } from "@/config.ts";
import { requireNoError } from "@app/error.ts";
import { Driver } from "./driver.ts";

export type DriverService = {
    addDriver: (driver: Driver) => Promise<Driver>;
    getDriverById: (licenseId: string) => Promise<Driver>;
    getAllDrivers: (limit?: number, page?: number) => Promise<Driver[]>;
    updateDriver: (driver: Driver) => Promise<Driver>;
    deleteDriver: (licenseId: string) => Promise<void>;
};

const driversUrl = `${ apiUrl }/drivers`;

export const newDriverService = (): DriverService => ({
    async addDriver(driver: Driver) {
        const response = await fetch(driversUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(driver, nonBlankFields),
        });

        await requireNoError(response);

        return await response.json() as Driver;
    },

    async getDriverById(licenseId: string) {
        const response = await fetch(`${ driversUrl }/${ licenseId }`);

        await requireNoError(response);

        return await response.json() as Driver;
    },

    async getAllDrivers(limit, page) {
        const queryParams = new URLSearchParams();

        if (limit !== undefined) {
            queryParams.append("limit", limit.toString());
        }
        if (page !== undefined) {
            queryParams.append("page", page.toString());
        }

        const url = `${ driversUrl }${
            queryParams.toString()
            ? `?${ queryParams.toString() }`
            : ""
        }`;

        const response = await fetch(url);

        await requireNoError(response);

        return await response.json() as Driver[];
    },

    async updateDriver(driver: Driver) {
        const { licenseId, ...driverUpdate } = driver;

        const response = await fetch(
            `${ driversUrl }/${ licenseId }`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(driverUpdate, blankFieldsToNull),
            },
        );

        await requireNoError(response);

        return await response.json() as Driver;
    },

    async deleteDriver(licenseId: string) {
        const response = await fetch(`${ driversUrl }/${ licenseId }`, {
            method: "DELETE",
        });

        await requireNoError(response);
    },
});

function nonBlankFields(_key: string, value: unknown): unknown {
    if (value === undefined || value === "") {
        return undefined; // Exclude these fields
    }
    return value;
}

function blankFieldsToNull(_key: string, value: unknown): unknown {
    if (typeof value === "string" && value.trim() === "") {
        return null; // Set blank fields explicitly to null
    }
    return value;
}
