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

    let body;

    try {
        body = await response.json() as { error: string };
    }
    catch (e: unknown) {
        console.error(e);
        body = { error: `Fail to read response error with status ${ response.status.toString() }.` };
    }

    throw new Error(body.error);
}
