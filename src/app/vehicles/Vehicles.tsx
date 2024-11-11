// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./Vehicles.css";
import { LoadingPane } from "@components/loading/LoadingPane.tsx";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useMemo, useState } from "react";
import { emptyVehicle, Vehicle } from "./vehicle.ts";
import { useVehicleDialog, useVehicleService } from "./vehicles.hook.ts";

export function Vehicles() {
    const {
        vehicles,
        loadingContent,
        registerVehicle,
        editVehicle,
        deleteVehicle,
    } = useVehicleService();

    const {
        isDialogVisible,
        isEditing,
        selectedVehicle,
        openNewVehicleDialog,
        openEditVehicleDialog,
        hideDialog,
    } = useVehicleDialog();

    const onSave = (vehicle: Vehicle, action: DialogAction) => {
        switch (action) {
            case "AddVehicle":
                registerVehicle(vehicle);
                break;
            case "EditVehicle":
                editVehicle(vehicle);
                break;
        }
        hideDialog();
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
                action={ isEditing ? "EditVehicle" : "AddVehicle" }
                onSave={ onSave }
                onHide={ hideDialog }
                selectedVehicle={ selectedVehicle }
            />
        </div>
    </>;
}

type DialogAction = "AddVehicle" | "EditVehicle";

const actionToString = (action: DialogAction) => ({
    "AddVehicle": "Add Vehicle",
    "EditVehicle": "Edit Vehicle",
}[action]);

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

    type VehicleValidationError = {
        numberError: string | null,
        brandError: string | null,
        modelError: string | null,
    }

    const noValidationError: VehicleValidationError = useMemo(() => ({
        brandError: null,
        modelError: null,
        numberError: null,
    }), []);

    const [ validationError, setValidationError ] = useState(noValidationError);

    const validateNumber = (newValue: string) => {
        const setNumberError = (numberError: string | null) => {
            setValidationError(prevState => ({ ...prevState, numberError }));
        };
        let isValid = false;

        if (newValue.trim() === "") {
            setNumberError("Vehicle number cannot be blank.");
        }
        else if (newValue.length > 20) {
            setNumberError("Vehicle number maximum length is 20 characters.");
        }
        else {
            setNumberError(null);
            isValid = true;
        }

        return isValid;
    };

    const validateBrand = (newValue: string) => {
        const setBrandError = (brandError: string | null) => {
            setValidationError(prevState => ({ ...prevState, brandError }));
        };
        let isValid = false;

        if (newValue.trim() === "") {
            setBrandError("Vehicle brand cannot be blank.");
        }
        else if (newValue.length > 100) {
            setBrandError("Vehicle brand maximum length is 100 characters.");
        }
        else {
            setBrandError(null);
            isValid = true;
        }

        return isValid;
    };

    const validateModel = (newValue: string) => {
        const setModelError = (modelError: string | null) => {
            setValidationError(prevState => ({ ...prevState, modelError }));
        };
        let isValid = false;

        if (newValue.trim() === "") {
            setModelError("Vehicle model cannot be blank.");
        }
        else if (newValue.length > 100) {
            setModelError("Vehicle model maximum length is 100 characters.");
        }
        else {
            setModelError(null);
            isValid = true;
        }

        return isValid;
    };

    const validate = (newValue: string, field: keyof Vehicle) => {
        switch (field) {
            case "number":
                validateNumber(newValue);
                break;

            case "brand":
                validateBrand(newValue);
                break;

            case "model":
                validateModel(newValue);
                break;
        }
    };

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof Vehicle,
    ) => {
        const newValue = e.target.value;

        setVehicle(prevVehicle => ({
            ...prevVehicle,
            [field]: newValue,
        }));

        validate(newValue, field);
    };

    const validateVehicle = () =>
        validateNumber(vehicle.number) &&
        validateBrand(vehicle.brand) &&
        validateModel(vehicle.model);

    const onSubmit = () => {
        if (validateVehicle()) {
            onSave(vehicle, action);
        }
    };

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
                onClick={ onSubmit }
                autoFocus
            />
        </div>
    </>;

    useEffect(() => {
        if (selectedVehicle) {
            setVehicle(selectedVehicle);
        }
        else {
            setVehicle(emptyVehicle);
            setValidationError(noValidationError);
        }
    }, [ noValidationError, selectedVehicle ]);

    return <>
        <Dialog
            className="vehicles-dialog"
            visible={ visible }
            onHide={ onHide }
            closeIcon="pi pi-times"
            header={ actionToString(action) }
            footer={ footer }
        >
            <div className="p-field">
                <label htmlFor="number">Number</label>
                <InputText
                    id="number"
                    value={ vehicle.number }
                    onChange={ e => { onInputChange(e, "number"); } }
                    disabled={ action === "EditVehicle" }
                    invalid={ validationError.numberError !== null }
                />
                { validationError.numberError &&
                  <small className="block p-error">{ validationError.numberError }</small> }
            </div>

            <div className="p-field">
                <label htmlFor="brand">Brand</label>
                <InputText
                    id="brand"
                    value={ vehicle.brand }
                    onChange={ e => { onInputChange(e, "brand"); } }
                    invalid={ validationError.brandError !== null }
                />
                { validationError.brandError &&
                  <small className="block p-error">{ validationError.brandError }</small> }
            </div>

            <div className="p-field">
                <label htmlFor="model">Model</label>
                <InputText
                    id="model"
                    value={ vehicle.model }
                    onChange={ e => { onInputChange(e, "model"); } }
                    invalid={ validationError.modelError !== null }
                />
                { validationError.modelError &&
                  <small className="block p-error">{ validationError.modelError }</small> }
            </div>
        </Dialog>
    </>;
}
