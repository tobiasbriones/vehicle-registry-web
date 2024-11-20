// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./AppErrorPane.css";
import { AppError, ErrorInfo } from "@common/app/app.error.ts";
import { valToString } from "@common/utils.ts";
import { replaceMessageOf } from "@components/app-error/app-error-parse.ts";
import { Fragment } from "react";

type AppErrorPaneProps = {
    error: AppError
}

export function AppErrorPane({ error }: AppErrorPaneProps) {
    const { type, info } = replaceMessageOf(error) as AppError;

    // It takes the str representing the error object and converts the new
    // lines "\n" to JSX breaks so the pre tag can apply the new line. It
    // also formats the indent according to how nested JSON braces are.
    const addLineBreak = (str: string) => {
        const baseIndent = "    ";
        let indentLevel = 0;

        return str.split("\\n").map((subStr, idx) => {
            const indent = baseIndent.repeat(indentLevel);

            if (subStr.includes("{")) {
                indentLevel++;
            }
            else if (subStr.includes("}")) {
                if (indentLevel > 0) {
                    indentLevel--;
                }
            }

            return (
                <Fragment key={ idx }>
                    { indent }{ subStr }
                    <br />
                </Fragment>
            );
        });
    };

    // valToString still shows `\"` unnecessary symbols like backslash and
    // quotes.
    const clean = (val: string) => val
        .replaceAll("\\\"", "")
        .replaceAll("\"", "");

    const infoStringHtml = addLineBreak(clean(valToString(info)));

    const errorInfo = (info: ErrorInfo) =>
        typeof info === "string"
        ? <p className="my-0">{ info }</p>
        : <pre
            className="p-1 text-left text-color p-mt-2 p-p-2 p-bg-light overflow-auto"
        >
            { infoStringHtml }
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
