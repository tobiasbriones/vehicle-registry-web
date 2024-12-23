// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./LoadingIndicator.css";
import { ProgressSpinner } from "primereact/progressspinner";

type LoadingIndicatorProps = {
    show: boolean,
    message: string,
};

export function LoadingIndicator(
    { show, message }: LoadingIndicatorProps,
) {
    const showClass = show ? "" : "opacity-0";

    return <>
        <div
            className={ `loading-indicator max-w-full flex flex-row align-items-center justify-content-center mb-2 ${ showClass }` }
        >
            <div className="mx-2">{ show ? message : "" }</div>
            <ProgressSpinner />
        </div>
    </>;
}
