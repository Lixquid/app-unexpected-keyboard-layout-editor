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
    const [name, setName] = useState(props.keyboard.name);
    const [hasBottomRow, setHasBottomRow] = useState(props.keyboard.bottomRow);
    const [width, setWidth] = useState(props.keyboard.width);

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
                                {/* Name */}
                                <label class="form-label" for="name-input">
                                    Name
                                </label>
                                <input
                                    id="name-input"
                                    class="form-control"
                                    type="text"
                                    value={name}
                                    onInput={(e) =>
                                        setName(
                                            (e.target as HTMLInputElement)
                                                .value,
                                        )
                                    }
                                />
                            </div>
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
                                                    .checked,
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
                            <div class="mb-3">
                                {/* Keyboard Width Setting */}
                                <div class="form-check form-switch">
                                    <input
                                        id="keyboard-widthEnabled-input"
                                        class="form-check-input"
                                        type="checkbox"
                                        checked={width !== undefined}
                                        onChange={(e) =>
                                            setWidth(
                                                (e.target as HTMLInputElement)
                                                    .checked
                                                    ? 10
                                                    : undefined,
                                            )
                                        }
                                    />
                                    <label
                                        class="form-check-label"
                                        for="keyboard-widthEnabled-input"
                                    >
                                        Override keyboard width
                                    </label>
                                    <div class="form-text">
                                        If enabled, the keyboard width will be
                                        set to the value below. If disabled, the
                                        keyboard width will be calculated based
                                        on the width of the widest row.
                                        <div class="input-group">
                                            <input
                                                id="keyboard-width-input"
                                                class="form-control"
                                                type="number"
                                                min="10"
                                                step="1"
                                                value={width}
                                                onInput={(e) =>
                                                    setWidth(
                                                        parseInt(
                                                            (
                                                                e.target as HTMLInputElement
                                                            ).value,
                                                        ),
                                                    )
                                                }
                                                disabled={width === undefined}
                                            />
                                            <span class="input-group-text">
                                                keys
                                            </span>
                                        </div>
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
                                        name,
                                        bottomRow: hasBottomRow,
                                        width,
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
