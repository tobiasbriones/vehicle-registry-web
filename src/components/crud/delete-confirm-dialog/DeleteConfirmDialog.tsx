// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { ConfirmDialog } from "primereact/confirmdialog";
import { DeleteConfirmItem } from "./delete-confirm-item.ts";

type DeleteConfirmDialogProps<T> = {
    confirmItem: DeleteConfirmItem<T> | undefined,
    onDelete: (item: T) => void;
    onCancel: () => void;
}

export function DeleteConfirmDialog<T>(
    {
        confirmItem,
        onDelete,
        onCancel,
    }: DeleteConfirmDialogProps<T>,
) {
    const message
        = confirmItem
          && `Are you sure you want to delete the ${ confirmItem.label } "${ confirmItem.id }"?`;

    const accept = () => {
        if (confirmItem !== undefined) {
            onDelete(confirmItem.item);
        }
    };

    return <>
        <ConfirmDialog
            visible={ confirmItem !== undefined }
            onHide={ onCancel }
            message={ message }
            header="Confirm Deletion"
            icon="pi pi-exclamation-triangle"
            closeIcon="pi pi-times"
            accept={ accept }
            reject={ onCancel }
        />
    </>;
}
