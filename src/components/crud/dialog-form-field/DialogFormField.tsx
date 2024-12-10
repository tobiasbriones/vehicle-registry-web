// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { HTMLInputTypeAttribute, KeyboardEventHandler } from "react";
import { FieldInputProps, FieldMetaState } from "react-final-form";

type FormFieldProps = {
    id: string,
    label: string,
    autoFocus?: boolean,
    disabled?: boolean,
    type?: HTMLInputTypeAttribute,
    meta: FieldMetaState<unknown>,
    input: FieldInputProps<string | undefined>,
};

export function DialogFormField(
    {
        id,
        label,
        autoFocus,
        disabled,
        type,
        meta,
        input,
    }: FormFieldProps,
) {
    const handleKeyDown: KeyboardEventHandler = event => {
        if (event.key === "Enter") {
            event.preventDefault();

            const formElement = event.currentTarget.closest("form");

            if (formElement) {
                formElement.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true }),
                );
            }
        }
    };

    return <>
        <div className="field mt-4">
        <span className="p-float-label">
            <InputText
                id={ id }
                { ...input }
                autoFocus={ autoFocus }
                disabled={ disabled }
                type={ type }
                className={ classNames({
                    "p-invalid": isFormFieldValid(meta),
                }) }
                style={ { width: "100%" } }
                onKeyDown={ handleKeyDown }
            />
            <label
                htmlFor={ id }
                className={ classNames({
                    "p-error": isFormFieldValid(meta),
                }) }
            >
                { label }
            </label>
        </span>

            { getFormErrorMessage(meta) }
        </div>
    </>;
}

const isFormFieldValid = (meta: FieldMetaState<unknown>) =>
    !!(meta.touched && meta.error);

const getFormErrorMessage = (meta: FieldMetaState<unknown>) =>
    isFormFieldValid(meta) &&
    <small className="p-error">{ meta.error }</small>;
