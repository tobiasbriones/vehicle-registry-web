// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { MessageOf, messageOfToString } from "@common/app/app.error.ts";

export function replaceMessageOf(obj: unknown): unknown {
    if (Array.isArray(obj)) {
        // Process each element in an array recursively
        return obj.map(replaceMessageOf);
    }
    else if (typeof obj === "object" && obj !== null) {
        // Replace MessageOf objects or recurse into object properties
        if (isMessageOf(obj)) {
            return messageOfToString(obj);
        }
        else {
            // Process object properties recursively
            return Object.fromEntries(
                Object
                    .entries(obj)
                    .map(([ key, value ]) => [
                        key,
                        replaceMessageOf(value),
                    ]),
            );
        }
    }
    // Return primitive values as is
    return obj;
}

const isMessageOf = (value: object): value is MessageOf<unknown> =>
    "message" in value &&
    "target" in value;
