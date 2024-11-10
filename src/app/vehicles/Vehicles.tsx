// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./Vehicles.css";
import { newVehicleService } from "@app/vehicles/vehicle.service.ts";
import { noneLoadingContent } from "@components/loading/loading-content.ts";
import { LoadingPane } from "@components/loading/LoadingPane.tsx";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useMemo, useState } from "react";
import { emptyVehicle, Vehicle } from "./vehicle.ts";

export function Vehicles() {
    const [ vehicles, setVehicles ] = useState<Vehicle[]>([]);
    const [ selectedVehicle, setSelectedVehicle ]
        = useState<Vehicle | null>(null);

    const [ loadingContent, setLoadingContent ] = useState(noneLoadingContent);

    const [ isDialogVisible, setIsDialogVisible ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);

    const service = useMemo(() => newVehicleService(), []);

    const setLoading = (message: string) => {
        setLoadingContent({ type: "Loading", message });
    };

    const setError = (error: unknown) => {
        setLoadingContent({
            type: "Error",
            message: String(error),
        });
    };

    const stopLoading = () => {
        setLoadingContent(noneLoadingContent);
    };

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

    const registerVehicle = (vehicle: Vehicle) => {
        const setNewVehicle = (res: Vehicle) => {
            setVehicles([
                ...vehicles,
                res,
            ]);
        };

        const addVehicle = async () => await service.addVehicle(vehicle);

        setLoading("Creating vehicle...");

        addVehicle()
            .then(setNewVehicle)
            .then(stopLoading)
            .catch(setError);
    };

    const editVehicle = (vehicle: Vehicle) => {
        const setUpdatedVehicle = (res: Vehicle) => {
            setVehicles(prevVehicles =>
                prevVehicles.map(v =>
                    v.number === res.number
                    ? res
                    : v,
                ),
            );
        };

        const updateVehicle = async () => await service.updateVehicle(vehicle);

        setLoading("Updating vehicle...");

        updateVehicle()
            .then(setUpdatedVehicle)
            .then(stopLoading)
            .catch(setError);
    };

    const onSave = (vehicle: Vehicle, action: DialogAction) => {
        switch (action) {
            case "Add Vehicle":
                registerVehicle(vehicle);
                break;
            case "Edit Vehicle":
                editVehicle(vehicle);
                break;
        }
        hideDialog();
    };

    const deleteVehicle = (vehicle: Vehicle) => {
        const setRemovedVehicle = () => {
            setVehicles(prevVehicles => prevVehicles.filter(
                v => v.number !== vehicle.number,
            ));
        };

        const deleteVehicle = async () => { await service.deleteVehicle(vehicle.number); };

        setLoading("Deleting vehicle...");

        deleteVehicle()
            .then(setRemovedVehicle)
            .then(stopLoading)
            .catch(setError);
    };

    const renderHeader = () => (
        <div className="table-header flex-column sm:flex-row m-0">
            <h2>Vehicles</h2>
            <Button
                label="Add Vehicle"
                icon="pi pi-plus"
                onClick={ openNewVehicleDialog }
            />
        </div>
    );

    const renderFooter = () => (
        <div className="table-header flex-column m-0 align-items-end">
            <LoadingPane
                content={ loadingContent }
            />
        </div>
    );

    const renderActionButtons = (rowData: Vehicle) => (
        <>
            <Button
                className="p-button-text mx-1 my-1"
                icon="pi pi-pencil"
                onClick={ () => { openEditVehicleDialog(rowData); } }
            />
            <Button
                className="p-button-text p-button-danger mx-1 my-1"
                icon="pi pi-trash"
                onClick={ () => { deleteVehicle(rowData); } }
            />
        </>
    );

    useEffect(() => {
        const setErrorWithMessage = (message: string) => (error: unknown) => {
            setError(`${ message } ${ String(error) }`);
        };

        const fetchVehicles = async () => await service.getAllVehicles();

        setLoading("Loading vehicles...");

        fetchVehicles()
            .then(setVehicles)
            .then(stopLoading)
            .catch(setErrorWithMessage(`Failed to fetch vehicles.`));
    }, [ service ]);

    return <>
        <div className="vehicles-crud">
            <DataTable
                value={ vehicles }
                header={ renderHeader() }
                footer={ renderFooter() }
            >
                <Column field="number" header="Number" />
                <Column field="brand" header="Brand" />
                <Column field="model" header="Model" />
                <Column body={ renderActionButtons } header="Actions" />
            </DataTable>

            <EditVehicleDialog
                visible={ isDialogVisible }
                action={ isEditing ? "Edit Vehicle" : "Add Vehicle" }
                onSave={ onSave }
                onHide={ hideDialog }
                selectedVehicle={ selectedVehicle }
            />
        </div>
    </>;
}

type DialogAction = "Add Vehicle" | "Edit Vehicle";

type EditVehicleDialogProps = {
    visible: boolean,
    action: DialogAction,
    onSave: (vehicle: Vehicle, action: DialogAction) => void,
    onHide: () => void,
    selectedVehicle?: Vehicle | null,
}

function EditVehicleDialog(
    {
        visible,
        action,
        onSave,
        onHide,
        selectedVehicle,
    }: EditVehicleDialogProps,
) {
    const [ vehicle, setVehicle ] = useState<Vehicle>(emptyVehicle);

    const footer = <>
        <div>
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={ onHide }
                className="p-button-text"
            />
            <Button
                label="Save"
                icon="pi pi-check"
                onClick={ () => { onSave(vehicle, action); } }
                autoFocus
            />
        </div>
    </>;

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof Vehicle,
    ) => {
        setVehicle({ ...vehicle, [field]: e.target.value });
    };

    useEffect(() => {
        if (selectedVehicle) {
            setVehicle(selectedVehicle);
        }
        else {
            setVehicle(emptyVehicle);
        }
    }, [ selectedVehicle ]);

    return <>
        <Dialog
            className="vehicles-dialog"
            visible={ visible }
            onHide={ onHide }
            closeIcon="pi pi-times"
            header={ action }
            footer={ footer }
        >
            <div className="p-field">
                <label htmlFor="number">Number</label>
                <InputText
                    id="number"
                    value={ vehicle.number }
                    onChange={ (e) => { onInputChange(e, "number"); } }
                    disabled={ action === "Edit Vehicle" }
                />
            </div>

            <div className="p-field">
                <label htmlFor="brand">Brand</label>
                <InputText
                    id="brand"
                    value={ vehicle.brand }
                    onChange={ (e) => { onInputChange(e, "brand"); } }
                />
            </div>

            <div className="p-field">
                <label htmlFor="model">Model</label>
                <InputText
                    id="model"
                    value={ vehicle.model }
                    onChange={ (e) => { onInputChange(e, "model"); } }
                />
            </div>
        </Dialog>
    </>;
}