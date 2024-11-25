// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

export type Vehicle = {
    number: string,
    brand: string,
    model: string,
}

export const emptyVehicle: Vehicle = {
    number: "",
    brand: "",
    model: "",
};

export const validateVehicle = (formVehicle: Vehicle) => {
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
