// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { FieldInputProps, FieldMetaState } from "react-final-form";

type FormFieldProps = {
    id: string,
    label: string,
    autoFocus?: boolean,
    disabled?: boolean,
    meta: FieldMetaState<unknown>,
    input: FieldInputProps<string | undefined>,
};

export function DialogFormField(
    {
        id,
        label,
        autoFocus,
        disabled,
        meta,
        input,
    }: FormFieldProps,
) {
    return <>
        <div className="field mt-4">
        <span className="p-float-label">
            <InputText
                id={ id }
                { ...input }
                autoFocus={ autoFocus }
                disabled={ disabled }
                className={ classNames({
                    "p-invalid": isFormFieldValid(meta),
                }) }
                style={ { width: "100%" } }
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
