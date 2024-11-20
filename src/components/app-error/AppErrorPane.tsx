// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./AppErrorPane.css";
import { AppError, ErrorInfo } from "@common/app/app.error.ts";
import { valToString } from "@common/utils.ts";

type AppErrorPaneProps = {
    error: AppError
}

export function AppErrorPane({ error }: AppErrorPaneProps) {
    const { type, info } = error;

    const errorInfo = (info: ErrorInfo) =>
        typeof info === "string"
        ? <p className="my-0">{ info }</p>
        : <pre
            className="p-1 text-left text-color p-mt-2 p-p-2 p-bg-light overflow-auto"
        >
            { valToString(info) }
        </pre>;

    return <>
        <div>
            <span className="error-color"><strong>{ type }</strong></span>
        </div>

        <div className="my-1">
            { errorInfo((info)) }
        </div>
    </>;
}
