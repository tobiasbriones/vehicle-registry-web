// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./VehicleLogDialog.css";
import { Driver, driverFullName } from "@app/drivers/driver.ts";
import {
    emptyVehicleLogFormCreateBody,
    validateVehicleLogCreate,
    VehicleLog,
    VehicleLogCreateBody,
    VehicleLogFormCreateBody,
    vehicleLogFormCreateBodyToApiBody,
    VehicleLogType,
    VehicleLogUpdateBody,
} from "@app/vehicle-logs/vehicle-log.ts";
import { Vehicle } from "@app/vehicles/vehicle.ts";
import {
    DialogFormField,
} from "@components/crud/dialog-form-field/DialogFormField.tsx";
import { FormApi } from "final-form";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import {
    Field,
    FieldRenderProps,
    Form,
    FormRenderProps,
} from "react-final-form";

export type DialogAction = "AddVehicleLog" | "EditVehicleLog";

type VehicleLogDialogProps = {
    visible: boolean,
    action: DialogAction,

    vehicles: Vehicle[],
    drivers: Driver[],

    onSave: (
        log: VehicleLogCreateBody | VehicleLogUpdateBody,
        action: DialogAction,
    ) => void,

    onHide: () => void,

    selectedLog?: VehicleLog | null,
}

export function VehicleLogDialog(
    {
        visible,
        action,
        vehicles,
        drivers,
        onSave,
        onHide,
    }: VehicleLogDialogProps,
) {
    const actionToString = (action: DialogAction) => ({
        "AddVehicleLog": "Add Vehicle Log",
        "EditVehicleLog": "Edit Vehicle Log",
    }[action]);

    return <>
        <Dialog
            className="crud-edit-dialog"
            visible={ visible && action === "AddVehicleLog" }
            onHide={ onHide }
            closeIcon="pi pi-times"
            header={ actionToString(action) }
        >
            <CreateVehicleLogForm
                vehicles={ vehicles }
                drivers={ drivers }
                onSave={ log => { onSave(log, action); } }
                onCancel={ onHide }
            />
        </Dialog>
    </>;
}

type CreateVehicleLogFormProps = {
    vehicles: Vehicle[],
    drivers: Driver[],
    onSave: (log: VehicleLogCreateBody) => void,
    onCancel: () => void,
}

function CreateVehicleLogForm(
    {
        vehicles,
        drivers,
        onSave,
        onCancel,
    }: CreateVehicleLogFormProps,
) {
    const handleSubmit = (
        formVehicleLog: VehicleLogFormCreateBody,
        form: FormApi<VehicleLogFormCreateBody, VehicleLogFormCreateBody>,
    ) => {
        const apiForm = vehicleLogFormCreateBodyToApiBody(formVehicleLog);

        onSave(apiForm);

        form.restart();
    };

    const driversWithFullName = drivers.map(driver => ({
        ...driver,
        fullName: driverFullName(driver),
    }));

    const formBody = ({ handleSubmit }: FormRenderProps<VehicleLogFormCreateBody, VehicleLogFormCreateBody>) => <>
        <form onSubmit={ event => { void handleSubmit(event); } }>
            <Field
                name="vehicle"
                render={ ({ input, meta }: FieldRenderProps<unknown>) =>
                    <div className="p-field">
                        <label htmlFor="vehicle">Vehicle</label>
                        <Dropdown
                            className="w-full p-inputtext p-component"
                            id="vehicle"
                            value={ input.value }
                            options={ vehicles }
                            onChange={ e => { input.onChange(e.value); } }
                            optionLabel="number"
                            placeholder="Select a Vehicle"
                            filter
                        />
                        { meta.touched && meta.error && (
                            <small className="p-error">{ meta.error }</small>
                        ) }
                    </div>
                }
            />

            <Field
                name="driver"
                render={ ({ input, meta }: FieldRenderProps<unknown>) =>
                    <div className="p-field">
                        <label htmlFor="driver">Driver</label>
                        <Dropdown
                            className="w-full p-inputtext p-component uppercase"
                            panelStyle={ { textTransform: "uppercase" } }
                            id="driver"
                            value={ input.value }
                            options={ driversWithFullName }
                            onChange={ e => { input.onChange(e.value); } }
                            optionLabel="fullName"
                            placeholder="Select a Driver"
                            filter
                        />
                        { meta.touched && meta.error && (
                            <small className="p-error">{ meta.error }</small>
                        ) }
                    </div>
                }
            />

            <Field
                name="logType"
                render={ (
                    { input, meta }: FieldRenderProps<VehicleLogType>,
                ) => (
                    <div className="p-field">
                        <label>Event</label>
                        
                        <div className="p-formgroup-inline flex gap-4 pt-2">
                            <div className="field-radiobutton">
                                <RadioButton
                                    id="entry"
                                    value="entry"
                                    name={ input.name }
                                    onChange={ e => { input.onChange(e.value); } }
                                    checked={ input.value === "entry" }
                                />
                                <label htmlFor="entry">Entry</label>
                            </div>
                            
                            <div className="field-radiobutton">
                                <RadioButton
                                    id="exit"
                                    value="exit"
                                    name={ input.name }
                                    onChange={ e => { input.onChange(e.value); } }
                                    checked={ input.value === "exit" }
                                />
                                <label htmlFor="exit">Exit</label>
                            </div>
                        </div>

                        { meta.touched && meta.error && (
                            <small className="p-error">{ meta.error }</small>
                        ) }
                    </div>
                ) }
            />

            <Field
                name="mileageInKilometers"
                render={ ({ input, meta }) =>
                    <DialogFormField
                        id="mileageInKilometers"
                        label="Mileage (KMs)"
                        meta={ meta }
                        input={ input }
                        type="number"
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
            validate={ validateVehicleLogCreate }
            initialValues={ emptyVehicleLogFormCreateBody }
            onSubmit={ handleSubmit }
            render={ formBody }
        />
    </>;
}
