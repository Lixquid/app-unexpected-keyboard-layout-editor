import { useState } from "preact/hooks";
import { KeyboardData } from "../lib/data";

/** Props for the KeyboardDialog component */
export interface KeyboardDialogProps {
    /** The keyboard data */
    keyboard: KeyboardData;
    /** Callback to update the keyboard data */
    setKeyboard: (keyboard: KeyboardData) => void;
    /** Callback to close the dialog */
    onClose: () => void;
}

/** A dialog for editing the keyboard metadata */
export function KeyboardDialog(props: KeyboardDialogProps) {
    const [hasBottomRow, setHasBottomRow] = useState(props.keyboard.bottomRow);

    return (
        <>
            <div class="modal d-block" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Edit Keyboard</h3>
                            <button
                                type="button"
                                class="btn-close"
                                aria-label="Close"
                                onClick={props.onClose}
                            />
                        </div>
                        <div class="modal-body text-wrap">
                            <div class="mb-3">
                                {/* Bottom Row Setting */}
                                <div class="form-check form-switch">
                                    <input
                                        id="bottom-row-input"
                                        class="form-check-input"
                                        type="checkbox"
                                        checked={hasBottomRow}
                                        onChange={(e) =>
                                            setHasBottomRow(
                                                (e.target as HTMLInputElement)
                                                    .checked
                                            )
                                        }
                                    />
                                    <label
                                        class="form-check-label"
                                        for="bottom-row-input"
                                    >
                                        Include default bottom row
                                    </label>
                                    <div class="form-text">
                                        The default bottom row is the row of
                                        keys that include the Ctrl, Fn, Space,
                                        and Enter keys. If you want to include
                                        your own bottom row in the layout,
                                        disable this setting.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-primary me-2"
                                onClick={() => {
                                    props.setKeyboard({
                                        ...props.keyboard,
                                        bottomRow: hasBottomRow,
                                    });
                                    props.onClose();
                                }}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                class="btn btn-secondary"
                                onClick={props.onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop show" />
        </>
    );
}
