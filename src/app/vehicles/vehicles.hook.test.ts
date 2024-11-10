// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { Vehicle } from "@app/vehicles/vehicle.ts";
import { useVehicleDialog } from "@app/vehicles/vehicles.hook.ts";
import { act, renderHook } from "@testing-library/react";

describe("useVehicleDialog", () => {
    it("initializes with correct default state", () => {
        const { result } = renderHook(() => useVehicleDialog());

        expect(result.current.isDialogVisible).toBe(false);
        expect(result.current.isEditing).toBe(false);
        expect(result.current.selectedVehicle).toBeNull();
    });

    it("opens a new vehicle dialog", () => {
        const { result } = renderHook(() => useVehicleDialog());

        act(() => { result.current.openNewVehicleDialog(); });

        expect(result.current.isDialogVisible).toBe(true);
        expect(result.current.isEditing).toBe(false);
        expect(result.current.selectedVehicle).toEqual({
            number: "",
            brand: "",
            model: "",
        });
    });

    it("opens an edit vehicle dialog with a specified vehicle", () => {
        const { result } = renderHook(() => useVehicleDialog());
        const mockVehicle: Vehicle = {
            number: "123",
            brand: "Toyota",
            model: "Corolla",
        };

        act(() => { result.current.openEditVehicleDialog(mockVehicle); });

        expect(result.current.isDialogVisible).toBe(true);
        expect(result.current.isEditing).toBe(true);
        expect(result.current.selectedVehicle).toEqual(mockVehicle);
    });

    it("hides the dialog and resets selected vehicle", () => {
        const { result } = renderHook(() => useVehicleDialog());

        act(() => { result.current.openNewVehicleDialog(); });
        act(() => { result.current.hideDialog(); });

        expect(result.current.isDialogVisible).toBe(false);
        expect(result.current.selectedVehicle).toBeNull();
    });
});
