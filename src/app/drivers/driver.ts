// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

export type Driver = {
    licenseId: string,
    firstName: string,
    surname: string,
    secondName?: string,
    secondSurname?: string,
}

export const emptyDriver: Driver = {
    licenseId: "",
    firstName: "",
    surname: "",
};

export const replaceDriverEmptyFields = (driver: Driver | undefined): Driver => {
    const normalizeDriver = (
        {
            licenseId,
            firstName,
            surname,
            secondName,
            secondSurname,
        }: Driver,
    ) => ({
        licenseId,
        firstName,
        surname,
        secondName: secondName ?? "",
        secondSurname: secondSurname ?? "",
    });

    return driver !== undefined ? normalizeDriver(driver) : emptyDriver;
};

export const driverFullName = (
    { firstName, secondName, surname, secondSurname }: Driver,
) => [ firstName, secondName, surname, secondSurname ]
    .filter(Boolean) // Remove undefined or falsy values
    .join(" ");

export const validateDriver = (formDriver: Driver) => {
    const errors: Partial<Driver> = {};

    if (!formDriver.licenseId || formDriver.licenseId.trim() === "") {
        errors.licenseId = "Driver license ID cannot be blank.";
    }
    else if (formDriver.licenseId.length < 6) {
        errors.licenseId = "Driver license ID minimum length is 6 characters.";
    }
    else if (formDriver.licenseId.length > 20) {
        errors.licenseId = "Driver license ID maximum length is 20 characters.";
    }

    if (!formDriver.firstName || formDriver.firstName.trim() === "") {
        errors.firstName = "Driver first name cannot be blank.";
    }
    else if (formDriver.firstName.length > 30) {
        errors.firstName = "Driver first name maximum length is 30 characters.";
    }

    if (!formDriver.surname || formDriver.surname.trim() === "") {
        errors.surname = "Driver surname cannot be blank.";
    }
    else if (formDriver.surname.length > 30) {
        errors.surname = "Driver surname maximum length is 30 characters.";
    }

    if (
        formDriver.secondName !== undefined &&
        formDriver.secondName.trim() !== ""
    ) {
        if (formDriver.secondName.length > 30) {
            errors.secondName = "Driver second name maximum length is 30 characters.";
        }
    }

    if (
        formDriver.secondSurname !== undefined &&
        formDriver.secondSurname.trim() !== ""
    ) {
        if (formDriver.secondSurname.length > 30) {
            errors.secondSurname = "Driver second surname maximum length is 30 characters.";
        }
    }

    return errors;
};
