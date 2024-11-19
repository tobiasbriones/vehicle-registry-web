// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { AppError, isAppError } from "@common/app/app.error.ts";
import { objToString } from "@common/utils.ts";

type ClientError = { message: string, info?: object } | AppError;

/**
 * Throws a `ClientError` if the response is not `ok`.
 */
export async function requireNoError(response: Response) {
    if (response.ok) {
        return;
    }

    let error: ClientError;

    try {
        const json = await response.json() as object;

        if (isAppError(json)) {
            error = json;
        }
        else {
            error = { message: "Fail to read server error.", info: json };
        }
    }
    catch (e: unknown) {
        console.error(e);
        error = { message: `Fail to read response error with status ${ response.status.toString() }.` } as ClientError;
    }
    throw new Error(objToString(error));
}
