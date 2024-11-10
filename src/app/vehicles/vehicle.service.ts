// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { Vehicle } from "./vehicle.ts";

export type VehicleService = {
    addVehicle: (vehicle: Vehicle) => Promise<Vehicle>;
    getVehicleById: (number: string) => Promise<Vehicle>;
    getAllVehicles: () => Promise<Vehicle[]>;
    updateVehicle: (vehicle: Vehicle) => Promise<Vehicle>;
    deleteVehicle: (number: string) => Promise<void>;
};

const API_HOSTNAME_ANY: unknown = import.meta.env.VITE_API_HOSTNAME ?? "";
const API_HOSTNAME = String(API_HOSTNAME_ANY);
const apiUrl = `https://${ API_HOSTNAME }`;

export const newVehicleService = (): VehicleService => ({
    async addVehicle(vehicle: Vehicle) {
        const response = await fetch(`${ apiUrl }/vehicles`, {
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
        const response = await fetch(`${ apiUrl }/vehicles/${ number }`);

        await requireNoError(response);

        return await response.json() as Vehicle;
    },

    async getAllVehicles() {
        const response = await fetch(`${ apiUrl }/vehicles`);

        await requireNoError(response);

        return await response.json() as Vehicle[];
    },

    async updateVehicle(vehicle: Vehicle) {
        const response = await fetch(
            `${ apiUrl }/vehicles/${ vehicle.number }`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vehicle),
            },
        );

        await requireNoError(response);

        return await response.json() as Vehicle;
    },

    async deleteVehicle(number: string) {
        const response = await fetch(`${ apiUrl }/vehicles/${ number }`, {
            method: "DELETE",
        });

        await requireNoError(response);
    },
});

async function requireNoError(response: Response) {
    if (response.ok) {
        return;
    }
    let body;

    try {
        body = await response.json() as { error: string };
    }
    catch (e: unknown) {
        console.error(e);
        body = { error: `Fail to read response error with status ${ response.status.toString() }.` };
    }

    throw new Error(body.error);
}
