// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { driverFullName } from "@app/drivers/driver.ts";
import {
    useVehicleLogDataServices,
} from "@app/vehicle-logs/vehicle-log-data.hook.ts";
import { VehicleLogDialog } from "@app/vehicle-logs/VehicleLogDialog.tsx";
import { isAppError } from "@common/app/app.error.ts";
import { valToString } from "@common/utils.ts";
import { AppErrorPane } from "@components/app-error/AppErrorPane.tsx";
import {
    DeleteConfirmItem,
} from "@components/crud/delete-confirm-dialog/delete-confirm-item.ts";
import {
    DeleteConfirmDialog,
} from "@components/crud/delete-confirm-dialog/DeleteConfirmDialog.tsx";
import { LoadingPane } from "@components/loading/LoadingPane.tsx";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import {
    VehicleLog,
    VehicleLogCreateBody,
    VehicleLogUpdateBody,
} from "./vehicle-log.ts";
import {
    useVehicleLogDialog,
    useVehicleLogService,
} from "./vehicle-logs.hook.ts";

export function VehicleLogs() {
    const tableRowLimit = 5;
    const maxLimit = 30;
    const defPage = 1;

    const {
        logs,
        loadingContent,
        fetchVehicleLogs,
        registerVehicleLog,
        deleteVehicleLog,
        setLoading,
        stopLoading,
        setError,
    } = useVehicleLogService(maxLimit, defPage);

    const {
        vehicles,
        fetchVehicles,
        drivers,
        fetchDrivers,
    } = useVehicleLogDataServices(setLoading, setError, stopLoading);

    const {
        isDialogVisible,
        isEditing,
        selectedVehicleLog,
        openNewVehicleLogDialog,
        hideDialog,
    } = useVehicleLogDialog();

    const [ deleteConfirmItem, setConfirmDeleteItem ]
        = useState<DeleteConfirmItem<VehicleLog> | undefined>(undefined);

    const onSave = (
        log: VehicleLogCreateBody | VehicleLogUpdateBody,
    ) => {
        registerVehicleLog(log as VehicleLogCreateBody);

        hideDialog();
    };

    const renderHeader = () => (
        <div className="table-header flex-column sm:flex-row m-0">
            <h2 className="my-2 sm:my-4">Vehicle Logs</h2>
            <Button
                className="mb-2 sm:mb-0"
                label="Add Log"
                icon="pi pi-plus"
                onClick={ openNewVehicleLogDialog }
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

    const renderActionButtons = (rowData: VehicleLog) => (
        <>
            <Button
                className="p-button-text p-button-danger mx-1 my-1"
                icon="pi pi-trash"
                onClick={ () => {
                    setConfirmDeleteItem({
                        item: rowData,
                        id: rowData.id.toString(),
                        label: "vehicle log",
                    });
                } }
            />
        </>
    );

    useEffect(fetchVehicleLogs, [ fetchVehicleLogs ]);
    useEffect(fetchVehicles, [ fetchVehicles ]);
    useEffect(fetchDrivers, [ fetchDrivers ]);

    return <>
        <div className="crud">
            <DataTable
                value={ logs }
                header={ renderHeader() }
                footer={ renderFooter() }
                paginator
                rows={ tableRowLimit }
                rowsPerPageOptions={ [ 5, 10, 25, 50 ] }
            >
                <Column className="uppercase" field="id" header="ID" />
                <Column field="vehicle.number" header="Vehicle" />

                <Column
                    className="uppercase"
                    header="Driver"
                    body={ ({ driver }: VehicleLog) => driverFullName(driver) }
                />

                <Column className="uppercase" field="logType" header="Event" />

                <Column
                    header="Timestamp"
                    body={ ({ timestamp }: VehicleLog) => timestamp.toLocaleString() }
                />

                <Column field="mileageInKilometers" header="Mileage (KMs)" />
                <Column body={ renderActionButtons } header="Actions" />
            </DataTable>

            <VehicleLogDialog
                visible={ isDialogVisible }
                action={ isEditing ? "EditVehicleLog" : "AddVehicleLog" }
                vehicles={ vehicles }
                drivers={ drivers }
                onSave={ onSave }
                onHide={ hideDialog }
                selectedLog={ selectedVehicleLog }
            />

            <DeleteConfirmDialog
                confirmItem={ deleteConfirmItem }
                onDelete={ deleteVehicleLog }
                onCancel={ () => {
                    setConfirmDeleteItem(undefined);
                } }
            />
        </div>
    </>;
}
