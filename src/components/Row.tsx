import { useState } from "preact/hooks";
import { RowData, canAddKeyToRow, newKey } from "../lib/data";
import { Key } from "./Key";
import { RowDialog } from "./RowDialog";

/** Props for the Row component */
export interface RowProps {
    /** The row data */
    rowData: RowData;
    /** Callback to update the row data */
    updateRow: (row: RowData) => void;
    /** Callback to delete the row */
    deleteRow: () => void;
}

/** A single row on the keyboard that supports editing */
export function Row(props: RowProps) {
    const [showEditDialog, setShowEditDialog] = useState(false);

    return (
        <div
            class="row"
            style={{ marginTop: props.rowData.shift * 5 + 0.2 + "rem" }}
        >
            <div
                class="col overflow-hidden text-nowrap"
                style={{ height: props.rowData.height * 5 + "rem" }}
            >
                {props.rowData.keys.map((key, j) => (
                    <Key
                        keyData={key}
                        updateKey={(key) =>
                            props.updateRow({
                                ...props.rowData,
                                keys: props.rowData.keys.map((k, l) =>
                                    l === j ? key : k
                                ),
                            })
                        }
                        deleteKey={() =>
                            props.updateRow({
                                ...props.rowData,
                                keys: props.rowData.keys.filter(
                                    (_, k) => k !== j
                                ),
                            })
                        }
                    />
                ))}
            </div>
            <div class="col-auto d-flex justify-content-center align-items-center">
                {/* Add Key Button */}
                <button
                    class="btn btn-outline-success"
                    onClick={() =>
                        props.updateRow({
                            ...props.rowData,
                            keys: [...props.rowData.keys, newKey()],
                        })
                    }
                    title="Add Key"
                    disabled={!canAddKeyToRow(props.rowData)}
                >
                    <i class="bi bi-plus-lg" />
                </button>
                {/* Row Settings Button */}
                <button
                    class="btn btn-outline-primary ms-2"
                    onClick={() => setShowEditDialog(true)}
                    title="Row Settings"
                >
                    <i class="bi bi-gear-fill" />
                </button>
            </div>
            {/* Row Settings Dialog */}
            {showEditDialog && (
                <RowDialog
                    rowData={props.rowData}
                    updateRow={props.updateRow}
                    deleteRow={props.deleteRow}
                    onClose={() => setShowEditDialog(false)}
                />
            )}
        </div>
    );
}
