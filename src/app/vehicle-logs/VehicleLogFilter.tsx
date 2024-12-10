// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./VehicleLogFilter.css";
import { Driver, driverFullName } from "@app/drivers/driver.ts";
import { ReadAllQueryParams } from "@app/vehicle-logs/vehicle-log.service.ts";
import { Vehicle } from "@app/vehicles/vehicle.ts";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";

type VehicleLogFilterProps = {
    vehicles: Vehicle[],
    drivers: Driver[],
    onChange: (filter: ReadAllQueryParams) => void;
}

export function VehicleLogFilter(
    { vehicles, drivers, onChange }: VehicleLogFilterProps,
) {
    const driversWithFullName = drivers
        .map(driver => ({
            ...driver,
            fullName: driverFullName(driver).toUpperCase(),
        }));

    const [ selectedVehicle, setSelectedVehicle ]
        = useState<Vehicle | undefined>(undefined);

    const [ selectedDriver, setSelectedDriver ]
        = useState<Driver | undefined>(undefined);

    const [ selectedDate, setSelectedDate ]
        = useState<Date | undefined>(undefined);

    useEffect(
        () => {
            onChange({
                vehicleNumber: selectedVehicle?.number,
                driverLicenseId: selectedDriver?.licenseId,
                date: selectedDate,
            });
        },
        [ selectedVehicle, selectedDriver, selectedDate, onChange ],
    );

    return <>
        <div
            className="filter flex justify-content-end ml-auto gap-4 p-3"
        >
            <div className="flex flex-column gap-4">
                {/* Vehicle Dropdown */ }
                <div className="flex flex-column flex-item">
                    <label htmlFor="vehicle">Vehicle</label>
                    <Dropdown
                        id="vehicle"
                        options={ vehicles }
                        value={ selectedVehicle }
                        onChange={ e => {
                            setSelectedVehicle(e.value as Vehicle);
                        } }
                        optionLabel="number"
                        placeholder="Select a Vehicle"
                        className="w-full"
                        filter
                    />
                </div>

                {/* Driver Dropdown */ }
                <div className="flex flex-column flex-item">
                    <label htmlFor="driver">Driver</label>
                    <Dropdown
                        id="driver"
                        options={ driversWithFullName }
                        value={ selectedDriver }
                        onChange={ e => {
                            setSelectedDriver(e.value as Driver);
                        } }
                        optionLabel="fullName"
                        placeholder="Select a Driver"
                        className="w-full"
                        panelStyle={ { textTransform: "uppercase" } }
                        filter
                    />
                </div>
            </div>

            <div className="flex flex-column gap-4">
                {/* Date Picker */ }
                <div className="flex flex-column flex-item text-center">
                    <label htmlFor="date">Date</label>
                    <Calendar
                        id="date"
                        value={ selectedDate }
                        onChange={ e => {
                            setSelectedDate(e.value ?? undefined);
                        } }
                        placeholder="Select a Date (UTC)"
                        selectionMode="single"
                        className="w-full"
                    />
                </div>

                <div className="flex gap-4 justify-content-end flex-grow-1">
                    {/* Apply Button */ }
                    <div className="flex align-items-end">
                        <Button
                            label="Reset"
                            onClick={ () => {
                                setSelectedVehicle(undefined);
                                setSelectedDriver(undefined);
                                setSelectedDate(undefined);
                            } }
                            className="p-button-primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    </>;
}
