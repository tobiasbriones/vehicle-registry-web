// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./Vehicles.css";
import { LoadingPane } from "@components/loading/LoadingPane.tsx";
import { FormApi } from "final-form";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Field, FieldMetaState, Form, FormRenderProps } from "react-final-form";
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

    const isFormFieldValid = (meta: FieldMetaState<unknown>) =>
        !!(meta.touched && meta.error);

    const getFormErrorMessage = (meta: FieldMetaState<unknown>) =>
        isFormFieldValid(meta) &&
        <small className="p-error">{ meta.error }</small>;

    const formBody = ({ handleSubmit }: FormRenderProps<Vehicle, Vehicle>) => <>
        <form onSubmit={ event => { void handleSubmit(event); } }>
            <Field
                name="number"
                render={ ({ input, meta }) => (
                    <div className="field mt-4">
                        <span className="p-float-label">
                            <InputText
                                id="number"
                                { ...input }
                                autoFocus
                                className={ classNames({
                                    "p-invalid": isFormFieldValid(meta),
                                }) }
                                disabled={ action === "EditVehicle" }
                            />
                            <label
                                htmlFor="number"
                                className={ classNames({
                                    "p-error": isFormFieldValid(meta),
                                }) }
                            >
                                Number
                            </label>
                        </span>
                        { getFormErrorMessage(meta) }
                    </div>
                ) }
            />

            <Field
                name="brand"
                render={ ({ input, meta }) => (
                    <div className="field mt-5">
                        <span className="p-float-label">
                            <InputText
                                id="brand"
                                { ...input }
                                autoFocus
                                className={ classNames({
                                    "p-invalid": isFormFieldValid(meta),
                                }) }
                            />
                            <label
                                htmlFor="brand"
                                className={ classNames({
                                    "p-error": isFormFieldValid(meta),
                                }) }
                            >
                                Brand
                            </label>
                        </span>
                        { getFormErrorMessage(meta) }
                    </div>
                ) }
            />

            <Field
                name="model"
                render={ ({ input, meta }) => (
                    <div className="field mt-5">
                        <span className="p-float-label">
                            <InputText
                                id="model"
                                { ...input }
                                autoFocus
                                className={ classNames({
                                    "p-invalid": isFormFieldValid(meta),
                                }) }
                            />
                            <label
                                htmlFor="model"
                                className={ classNames({
                                    "p-error": isFormFieldValid(meta),
                                }) }
                            >
                                Model
                            </label>
                        </span>
                        { getFormErrorMessage(meta) }
                    </div>
                ) }
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
