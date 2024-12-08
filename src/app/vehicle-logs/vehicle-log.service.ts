// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { apiUrl } from "@/config.ts";
import { requireNoError } from "@app/error.ts";
import {
    VehicleLog,
    VehicleLogCreateBody,
    VehicleLogUpdateBody,
} from "@app/vehicle-logs/vehicle-log.ts";

export type ReadAllQueryParams = {
    vehicleNumber?: string;
    driverLicenseId?: string;
    date?: Date;
}

export type VehicleLogService = {
    addVehicleLog: (log: VehicleLogCreateBody) => Promise<VehicleLog>;
    getVehicleById: (id: string) => Promise<VehicleLog>;

    getAllVehicleLogs: (
        limit?: number,
        page?: number,
        filter?: ReadAllQueryParams,
    ) => Promise<VehicleLog[]>;

    updateVehicleLog: (log: VehicleLogUpdateBody) => Promise<VehicleLog>;
    deleteVehicleLog: (id: string) => Promise<void>;
};

const logsUrl = `${ apiUrl }/logs`;

export const newVehicleLogService = (): VehicleLogService => ({
    async addVehicleLog(log: VehicleLogCreateBody) {
        const response = await fetch(logsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(log),
        });

        await requireNoError(response);

        return await response.json() as VehicleLog;
    },

    async getVehicleById(id: string) {
        const response = await fetch(`${ logsUrl }/${ id }`);

        await requireNoError(response);

        const rawLog = await response.json() as VehicleLog;

        return { ...rawLog, timestamp: new Date(rawLog.timestamp) };
    },

    async getAllVehicleLogs(limit, page, filter) {
        const queryParams = new URLSearchParams();

        if (limit !== undefined) {
            queryParams.append("limit", limit.toString());
        }
        if (page !== undefined) {
            queryParams.append("page", page.toString());
        }
        if (filter !== undefined) {
            if (filter.vehicleNumber !== undefined) {
                queryParams.append("vehicle-number", filter.vehicleNumber);
            }
            if (filter.driverLicenseId !== undefined) {
                queryParams.append("driver-license-id", filter.driverLicenseId);
            }
            if (filter.date !== undefined) {
                queryParams.append("date", filter.date.toString());
            }
        }

        const url = `${ logsUrl }${
            queryParams.toString()
            ? `?${ queryParams.toString() }`
            : ""
        }`;

        const response = await fetch(url);

        await requireNoError(response);

        const rawLogs = await response.json() as VehicleLog[];

        return rawLogs
            .map(log => ({
                ...log,
                timestamp: new Date(log.timestamp),
            }));
    },

    async updateVehicleLog(log: VehicleLogUpdateBody) {
        const { id, ...vehicleUpdate } = log;

        const response = await fetch(
            `${ logsUrl }/${ id.toString() }`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vehicleUpdate),
            },
        );

        await requireNoError(response);

        return await response.json() as VehicleLog;
    },

    async deleteVehicleLog(id: string) {
        const response = await fetch(`${ logsUrl }/${ id }`, {
            method: "DELETE",
        });

        await requireNoError(response);
    },
});
