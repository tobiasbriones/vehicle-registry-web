// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { apiUrl } from "@/config.ts";
import { requireNoError } from "@app/error.ts";
import { Vehicle } from "./vehicle.ts";

export type VehicleService = {
    addVehicle: (vehicle: Vehicle) => Promise<Vehicle>;
    getVehicleById: (number: string) => Promise<Vehicle>;
    getAllVehicles: (limit?: number, page?: number) => Promise<Vehicle[]>;
    updateVehicle: (vehicle: Vehicle) => Promise<Vehicle>;
    deleteVehicle: (number: string) => Promise<void>;
};

const vehiclesUrl = `${ apiUrl }/vehicles`;

export const newVehicleService = (): VehicleService => ({
    async addVehicle(vehicle: Vehicle) {
        const response = await fetch(vehiclesUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vehicle),
        });

        await requireNoError(response);

        return await response.json() as Vehicle;
    },

    async getVehicleById(number: string) {
        const response = await fetch(`${ vehiclesUrl }/${ number }`);

        await requireNoError(response);

        return await response.json() as Vehicle;
    },

    async getAllVehicles(limit, page) {
        const queryParams = new URLSearchParams();

        if (limit !== undefined) {
            queryParams.append("limit", limit.toString());
        }
        if (page !== undefined) {
            queryParams.append("page", page.toString());
        }

        const url = `${ vehiclesUrl }${
            queryParams.toString()
            ? `?${ queryParams.toString() }`
            : ""
        }`;

        const response = await fetch(url);

        await requireNoError(response);

        return await response.json() as Vehicle[];
    },

    async updateVehicle(vehicle: Vehicle) {
        const { number, ...vehicleUpdate } = vehicle;

        const response = await fetch(
            `${ vehiclesUrl }/${ number }`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vehicleUpdate),
            },
        );

        await requireNoError(response);

        return await response.json() as Vehicle;
    },

    async deleteVehicle(number: string) {
        const response = await fetch(`${ vehiclesUrl }/${ number }`, {
            method: "DELETE",
        });

        await requireNoError(response);
    },
});
