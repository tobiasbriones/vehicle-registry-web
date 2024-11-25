// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { isAppError } from "@common/app/app.error.ts";
import { valToString } from "@common/utils.ts";
import { AppErrorPane } from "@components/app-error/AppErrorPane.tsx";
import {
    DeleteConfirmItem,
} from "@components/crud/delete-confirm-dialog/delete-confirm-item.ts";
import {
    DeleteConfirmDialog,
} from "@components/crud/delete-confirm-dialog/DeleteConfirmDialog.tsx";
import {
    DialogFormField,
} from "@components/crud/dialog-form-field/DialogFormField.tsx";
import { LoadingPane } from "@components/loading/LoadingPane.tsx";
import { FormApi } from "final-form";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Field, Form, FormRenderProps } from "react-final-form";
import {
    Driver,
    driverFullName,
    replaceDriverEmptyFields,
    validateDriver,
} from "./driver.ts";
import { useDriverDialog, useDriverService } from "./drivers.hook.ts";

export function Drivers() {
    const tableRowLimit = 5;
    const maxLimit = 30;
    const defPage = 1;

    const {
        drivers,
        loadingContent,
        fetchDrivers,
        registerDriver,
        editDriver,
        deleteDriver,
    } = useDriverService(maxLimit, defPage);

    const {
        isDialogVisible,
        isEditing,
        selectedDriver,
        openNewDriverDialog,
        openEditDriverDialog,
        hideDialog,
    } = useDriverDialog();

    const [ deleteConfirmItem, setConfirmDeleteItem ]
        = useState<DeleteConfirmItem<Driver> | undefined>(undefined);

    const onSave = (driver: Driver, action: DialogAction) => {
        switch (action) {
            case "AddDriver":
                registerDriver(driver);
                break;
            case "EditDriver":
                editDriver(driver);
                break;
        }
        hideDialog();
    };

    const renderHeader = () => (
        <div className="table-header flex-column sm:flex-row m-0">
            <h2 className="my-2 sm:my-4">Drivers</h2>
            <Button
                className="mb-2 sm:mb-0"
                label="Add Driver"
                icon="pi pi-plus"
                onClick={ openNewDriverDialog }
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

    const renderActionButtons = (rowData: Driver) => (
        <>
            <Button
                className="p-button-text mx-1 my-1"
                icon="pi pi-pencil"
                onClick={ () => { openEditDriverDialog(rowData); } }
            />
            <Button
                className="p-button-text p-button-danger mx-1 my-1"
                icon="pi pi-trash"
                onClick={ () => {
                    setConfirmDeleteItem({
                        item: rowData,
                        id: rowData.licenseId,
                        label: "vehicle",
                    });
                } }
            />
        </>
    );

    useEffect(fetchDrivers, [ fetchDrivers ]);

    return <>
        <div className="crud">
            <DataTable
                value={ drivers }
                header={ renderHeader() }
                footer={ renderFooter() }
                paginator
                rows={ tableRowLimit }
                rowsPerPageOptions={ [ 5, 10, 25, 50 ] }
            >
                <Column field="licenseId" header="License ID" />
                <Column
                    className="uppercase"
                    body={ driverFullName }
                    header="Full Name"
                />
                <Column body={ renderActionButtons } header="Actions" />
            </DataTable>

            <EditDriverDialog
                visible={ isDialogVisible }
                action={ isEditing ? "EditDriver" : "AddDriver" }
                onSave={ onSave }
                onHide={ hideDialog }
                selectedDriver={ selectedDriver }
            />

            <DeleteConfirmDialog
                confirmItem={ deleteConfirmItem }
                onDelete={ deleteDriver }
                onCancel={ () => {
                    setConfirmDeleteItem(undefined);
                } }
            />
        </div>
    </>;
}

type DialogAction = "AddDriver" | "EditDriver";

const actionToString = (action: DialogAction) => ({
    "AddDriver": "Add Driver",
    "EditDriver": "Edit Driver",
}[action]);

type EditDriverDialogProps = {
    visible: boolean,
    action: DialogAction,
    onSave: (driver: Driver, action: DialogAction) => void,
    onHide: () => void,
    selectedDriver?: Driver,
}

function EditDriverDialog(
    {
        visible,
        action,
        onSave,
        onHide,
        selectedDriver,
    }: EditDriverDialogProps,
) {
    return <>
        <Dialog
            className="crud-edit-dialog"
            visible={ visible }
            onHide={ onHide }
            closeIcon="pi pi-times"
            header={ actionToString(action) }
        >
            <EditDriverForm
                action={ action }
                onSave={ onSave }
                onCancel={ onHide }
                selectedDriver={ selectedDriver }
            />
        </Dialog>
    </>;
}

type EditDriverFormProps = {
    action: DialogAction,
    onSave: (driver: Driver, action: DialogAction) => void,
    onCancel: () => void,
    selectedDriver?: Driver,
}

function EditDriverForm(
    {
        action,
        onSave,
        onCancel,
        selectedDriver,
    }: EditDriverFormProps,
) {
    const handleSubmit = (
        formDriver: Driver,
        form: FormApi<Driver, Driver>,
    ) => {
        onSave(formDriver, action);

        form.restart();
    };

    const formBody = ({ handleSubmit }: FormRenderProps<Driver, Driver>) => <>
        <form
            onSubmit={ event => { void handleSubmit(event); } }
        >
            <Field
                name="licenseId"
                render={ ({ input, meta }) =>
                    <DialogFormField
                        id="licenseId"
                        label="License ID"
                        meta={ meta }
                        input={ input }
                        disabled={ action === "EditDriver" }
                    />
                }
            />

            <Field
                name="firstName"
                render={ ({ input, meta }) =>
                    <DialogFormField
                        id="firstName"
                        label="First Name"
                        meta={ meta }
                        input={ input }
                    />
                }
            />

            <Field
                name="secondName"
                render={ ({ input, meta }) =>
                    <DialogFormField
                        id="secondName"
                        label="Second Name"
                        meta={ meta }
                        input={ input }
                    />
                }
            />

            <Field
                name="surname"
                render={ ({ input, meta }) =>
                    <DialogFormField
                        id="surname"
                        label="Surname"
                        meta={ meta }
                        input={ input }
                    />
                }
            />

            <Field
                name="secondSurname"
                render={ ({ input, meta }) =>
                    <DialogFormField
                        id="secondSurname"
                        label="Second Surname"
                        meta={ meta }
                        input={ input }
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
                    autoFocus={ true }
                />
            </div>
        </form>
    </>;

    return <>
        <Form
            validate={ validateDriver }
            initialValues={ replaceDriverEmptyFields(selectedDriver) }
            onSubmit={ handleSubmit }
            render={ formBody }
        />
    </>;
}
