// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

export type ErrorType
    = "InternalError"
    | "DuplicateError"
    | "ValidationError"
    | "NotFoundError"

export type ErrorInfo = string | object;

export type AppError = {
    type: ErrorType,
    info: ErrorInfo,
}

const isNonNullObject = (obj: unknown) =>
    typeof obj === "object" && obj !== null;

export const isAppError = (error: unknown): error is AppError =>
    isNonNullObject(error) &&
    "type" in error &&
    "info" in error;
