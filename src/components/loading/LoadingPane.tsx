// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./LoadingPane.css";
import { objToString } from "@common/utils.ts";
import { ReactNode } from "react";
import { LoadingContent } from "./loading-content.ts";
import { LoadingIndicator } from "./LoadingIndicator.tsx";

type LoadingPaneProps = {
    content: LoadingContent,
    renderError?: (info: object) => ReactNode,
}

export function LoadingPane({ content, renderError }: LoadingPaneProps) {
    const { type, info } = content;

    const errorFromObject = (error: object) =>
        renderError !== undefined
        ? renderError(error)
        : <>{ objToString(error) }</>;

    const error =
        typeof info === "string"
        ? <p className="error-color">{ info }</p>
        : errorFromObject(info);

    return <>
        <LoadingIndicator
            show={ type === "Loading" }
            message={ typeof info === "string" ? info : JSON.stringify(info) }
        />

        <div
            className={
                `error ${ type === "Error" ? "" : "opacity-0" }`
            }
        >
            { error }
        </div>
    </>;
}
