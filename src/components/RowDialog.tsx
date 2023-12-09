import { useState } from "preact/hooks";
import { RowData } from "../lib/data";

/** Props for the RowDialog component */
export interface RowDialogProps {
    /** The row data */
    rowData: RowData;
    /** Callback to update the row data */
    updateRow: (row: RowData) => void;
    /** Callback to delete the row */
    deleteRow: () => void;
    /** Callback to close the dialog */
    onClose: () => void;
}

/** Dialog to edit or delete a row's metadata */
export function RowDialog(props: RowDialogProps) {
    const [height, setHeight] = useState(props.rowData.height * 100);
    const [shift, setShift] = useState(props.rowData.shift * 100);

    return (
        <>
            <div class="modal d-block" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Edit Row</h3>
                            <button
                                type="button"
                                class="btn-close"
                                aria-label="Close"
                                onClick={props.onClose}
                            />
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                {/* Row Height Setting */}
                                <label
                                    class="form-label"
                                    for="row-height-input"
                                >
                                    Row Height
                                </label>
                                <div class="input-group">
                                    <input
                                        id="row-height-input"
                                        class="form-control"
                                        type="number"
                                        min="10"
                                        step="1"
                                        value={height}
                                        onInput={(e) =>
                                            setHeight(
                                                parseInt(
                                                    (
                                                        e.target as HTMLInputElement
                                                    ).value,
                                                ),
                                            )
                                        }
                                    />
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                {/* Row Shift Setting */}
                                <label class="form-label" for="row-shift-input">
                                    Row Top Padding
                                </label>
                                <div class="input-group">
                                    <input
                                        id="row-shift-input"
                                        class="form-control"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={shift}
                                        onInput={(e) =>
                                            setShift(
                                                parseInt(
                                                    (
                                                        e.target as HTMLInputElement
                                                    ).value,
                                                ),
                                            )
                                        }
                                    />
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="d-flex justify-content-between w-100">
                                {/* Delete Row Button */}
                                <button
                                    class="btn btn-outline-danger"
                                    onClick={() => {
                                        props.deleteRow();
                                        props.onClose();
                                    }}
                                >
                                    Delete Row
                                </button>
                                <div>
                                    {/* Save Row Button */}
                                    <button
                                        class="btn btn-primary"
                                        onClick={() => {
                                            props.updateRow({
                                                ...props.rowData,
                                                height: height / 100,
                                                shift: shift / 100,
                                            });
                                            props.onClose();
                                        }}
                                    >
                                        Save
                                    </button>
                                    {/* Cancel Button */}
                                    <button
                                        class="btn btn-secondary ms-2"
                                        onClick={props.onClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" />
        </>
    );
}
