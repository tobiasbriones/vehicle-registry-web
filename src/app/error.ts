// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

/**
 * Defines the error type the API uses throughout the application.
 */
export type AppError = {
    error: string,
}

/**
 * Throws an `AppError` if the response is not `ok`.
 */
export async function requireNoError(response: Response) {
    if (response.ok) {
        return;
    }

    let body: AppError;

    try {
        const json = await response.json() as unknown;

        if (isAppError(json)) {
            body = json;
        }
        else {
            body = { error: JSON.stringify(json, null, 4) };
        }
    }
    catch (e: unknown) {
        console.error(e);
        body = { error: `Fail to read response error with status ${ response.status.toString() }.` } as AppError;
    }
    throw new Error(JSON.stringify(body.error));
}

const isNonNullObject = (obj: unknown) =>
    typeof obj === "object" && obj !== null;

const isAppError = (error: unknown): error is AppError =>
    isNonNullObject(error) &&
    "error" in error;
