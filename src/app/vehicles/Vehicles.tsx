// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./Vehicles.css";
import { isAppError } from "@common/app/app.error.ts";
import { valToString } from "@common/utils.ts";
import { AppErrorPane } from "@components/app-error/AppErrorPane.tsx";
import {
    DialogFormField,
} from "@components/crud/dialog-form-field/DialogFormField.tsx";
import { LoadingPane } from "@components/loading/LoadingPane.tsx";
import { FormApi } from "final-form";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import { Field, Form, FormRenderProps } from "react-final-form";
import { emptyVehicle, Vehicle } from "./vehicle.ts";
import { useVehicleDialog, useVehicleService } from "./vehicles.hook.ts";

export function Vehicles() {
    const tableRowLimit = 5;

    // Load 30 vehicles into the table maximum (the last ones added). If you
    // want to show "older" vehicles you will have to enhance the pagination
    // to support an unlimited amount of pages.
    const maxLimit = 30;

    const defPage = 1;

    const {
        vehicles,
        loadingContent,
        fetchVehicles,
        registerVehicle,
        editVehicle,
        deleteVehicle,
    } = useVehicleService(maxLimit, defPage);

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

    const renderError = (error: object) =>
        isAppError(error)
        ? <AppErrorPane error={ error } />
        : <p className="error-color">{ valToString(error) }</p>;

    const renderFooter = () => (
        <div className="table-header flex-column m-0 align-items-end">
            <LoadingPane
                content={ loadingContent }
                renderError={ renderError }
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

    useEffect(fetchVehicles, [ fetchVehicles ]);

    return <>
        <div className="vehicles-crud">
            <DataTable
                value={ vehicles }
                header={ renderHeader() }
                footer={ renderFooter() }
                paginator
                rows={ tableRowLimit }
                rowsPerPageOptions={ [ 5, 10, 25, 50 ] }
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
    return <>
        <Dialog
            className="vehicles-dialog"
            visible={ visible }
            onHide={ onHide }
            closeIcon="pi pi-times"
            header={ actionToString(action) }
        >
            <EditVehicleForm
                action={ action }
                onSave={ onSave }
                onCancel={ onHide }
                selectedVehicle={ selectedVehicle }
            />
        </Dialog>
    </>;
}

type EditVehicleFormProps = {
    action: DialogAction,
    onSave: (vehicle: Vehicle, action: DialogAction) => void,
    onCancel: () => void,
    selectedVehicle?: Vehicle | null,
}

function EditVehicleForm(
    {
        action,
        onSave,
        onCancel,
        selectedVehicle,
    }: EditVehicleFormProps,
) {
    const validate = (formVehicle: Vehicle) => {
        const errors: Partial<Vehicle> = {};

        if (!formVehicle.number || formVehicle.number.trim() === "") {
            errors.number = "Vehicle number cannot be blank.";
        }
        else if (formVehicle.number.length > 20) {
            errors.number = "Vehicle number maximum length is 20 characters.";
        }

        if (!formVehicle.brand || formVehicle.brand.trim() === "") {
            errors.brand = "Vehicle brand cannot be blank.";
        }
        else if (formVehicle.brand.length > 100) {
            errors.brand = "Vehicle brand maximum length is 100 characters.";
        }

        if (!formVehicle.model || formVehicle.model.trim() === "") {
            errors.model = "Vehicle model cannot be blank.";
        }
        else if (formVehicle.model.length > 100) {
            errors.model = "Vehicle model maximum length is 100 characters.";
        }

        return errors;
    };

    const onSubmit = (
        formVehicle: Vehicle,
        form: FormApi<Vehicle, Vehicle>,
    ) => {
        onSave(formVehicle, action);

        form.restart();
    };

    const formBody = ({ handleSubmit }: FormRenderProps<Vehicle, Vehicle>) => <>
        <form onSubmit={ event => { void handleSubmit(event); } }>
            <Field
                name="number"
                render={ ({ input, meta }) =>
                    <DialogFormField
                        id="number"
                        label="Number"
                        meta={ meta }
                        input={ input }
                        disabled={ action === "EditVehicle" }
                        autoFocus
                    />
                }
            />

            <Field
                name="brand"
                render={ ({ input, meta }) =>
                    <DialogFormField
                        id="brand"
                        label="Brand"
                        meta={ meta }
                        input={ input }
                        autoFocus
                    />
                }
            />

            <Field
                name="model"
                render={ ({ input, meta }) =>
                    <DialogFormField
                        id="model"
                        label="Model"
                        meta={ meta }
                        input={ input }
                        autoFocus
                    />
                }
            />

            <div className="flex mt-4 justify-content-end gap-4">
                <Button
                    label="Cancel"
                    icon="pi pi-times"
                    onClick={ onCancel }
                    className="p-button-text"
                />
                <Button
                    type="submit"
                    label="Save"
                    icon="pi pi-check"
                    autoFocus
                />
            </div>
        </form>
    </>;

    return <>
        <Form
            validate={ validate }
            initialValues={ selectedVehicle ?? emptyVehicle }
            onSubmit={ onSubmit }
            render={ formBody }
        />
    </>;
}
