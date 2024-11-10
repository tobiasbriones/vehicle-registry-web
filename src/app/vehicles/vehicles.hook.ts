// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { Vehicle } from "@app/vehicles/vehicle.ts";
import { useState } from "react";

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
