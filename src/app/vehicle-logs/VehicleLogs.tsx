// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { driverFullName } from "@app/drivers/driver.ts";
import { isAppError } from "@common/app/app.error.ts";
import { valToString } from "@common/utils.ts";
import { AppErrorPane } from "@components/app-error/AppErrorPane.tsx";
import { LoadingPane } from "@components/loading/LoadingPane.tsx";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect } from "react";
import { VehicleLog } from "./vehicle-log.ts";
import { useVehicleLogService } from "./vehicle-logs.hook.ts";

export function VehicleLogs() {
    const tableRowLimit = 5;
    const maxLimit = 30;
    const defPage = 1;

    const {
        logs,
        loadingContent,
        fetchVehicleLogs,
    } = useVehicleLogService(maxLimit, defPage);

    const renderHeader = () => (
        <div className="table-header flex-column sm:flex-row m-0">
            <h2 className="my-2 sm:my-4">Vehicle Logs</h2>
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

    useEffect(fetchVehicleLogs, [ fetchVehicleLogs ]);

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
            </DataTable>
        </div>
    </>;
}
