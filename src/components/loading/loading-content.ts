// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

export type LoadingMessageType = "None" | "Loading" | "Error";

export type LoadingContent = {
    type: LoadingMessageType,
    info: string | object,
}

export const noneLoadingContent: LoadingContent = { type: "None", info: "" };
