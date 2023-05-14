import { useState } from "preact/hooks";
import { KeyData } from "../lib/data";
import { KeyInput } from "./KeyInput";

/** Props for the KeyDialog component */
export interface KeyDialogProps {
    /** The key data */
    keyData: KeyData;
    /** Callback to update the key data */
    updateKey: (key: KeyData) => void;
    /** Callback to delete the key */
    deleteKey: () => void;
    /** Callback to close the dialog */
    onClose: () => void;
}

/** A dialog for editing a single key on the keyboard */
export function KeyDialog(props: KeyDialogProps) {
    const [shift, setShift] = useState(props.keyData.shift * 100);
    const [width, setWidth] = useState(props.keyData.width * 100);
    const [slider, setSlider] = useState(false);
    const [key0, setKey0] = useState(props.keyData.key0);
    const [key1, setKey1] = useState(props.keyData.key1);
    const [key2, setKey2] = useState(props.keyData.key2);
    const [key3, setKey3] = useState(props.keyData.key3);
    const [key4, setKey4] = useState(props.keyData.key4);
    const [key5, setKey5] = useState(props.keyData.key5);
    const [key6, setKey6] = useState(props.keyData.key6);
    const [key7, setKey7] = useState(props.keyData.key7);
    const [key8, setKey8] = useState(props.keyData.key8);

    const [showCornerKeys, setShowCornerKeys] = useState(false);
    const [showEdgeKeys, setShowEdgeKeys] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <>
            <div class="modal d-block" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Edit Key</h3>
                            <button
                                type="button"
                                class="btn-close"
                                aria-label="Close"
                                onClick={props.onClose}
                            />
                        </div>
                        <div class="modal-body text-wrap">
                            <KeyInput
                                entry="key0"
                                input={key0}
                                updateInput={setKey0}
                            />

                            <div class="mb-3">
                                <button
                                    class="btn btn-outline-secondary dropdown-toggle me-2"
                                    onClick={() =>
                                        setShowCornerKeys(!showCornerKeys)
                                    }
                                >
                                    {showCornerKeys ? "Hide" : "Show"} Corner
                                    Keys
                                </button>
                                <button
                                    class="btn btn-outline-secondary dropdown-toggle me-2"
                                    onClick={() =>
                                        setShowEdgeKeys(!showEdgeKeys)
                                    }
                                >
                                    {showEdgeKeys ? "Hide" : "Show"} Edge Keys
                                </button>
                            </div>
                            {/* Corner Keys */}
                            {showCornerKeys && (
                                <>
                                    <KeyInput
                                        entry="key1"
                                        input={key1}
                                        updateInput={setKey1}
                                    />
                                    <KeyInput
                                        entry="key2"
                                        input={key2}
                                        updateInput={setKey2}
                                    />
                                    <KeyInput
                                        entry="key3"
                                        input={key3}
                                        updateInput={setKey3}
                                    />
                                    <KeyInput
                                        entry="key4"
                                        input={key4}
                                        updateInput={setKey4}
                                    />
                                </>
                            )}

                            {/* Edge Keys */}
                            {showEdgeKeys && (
                                <>
                                    <KeyInput
                                        entry="key5"
                                        input={key5}
                                        updateInput={setKey5}
                                    />
                                    <KeyInput
                                        entry="key6"
                                        input={key6}
                                        updateInput={setKey6}
                                    />
                                    <KeyInput
                                        entry="key7"
                                        input={key7}
                                        updateInput={setKey7}
                                    />
                                    <KeyInput
                                        entry="key8"
                                        input={key8}
                                        updateInput={setKey8}
                                    />
                                </>
                            )}

                            <button
                                class="btn btn-outline-secondary dropdown-toggle"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                            >
                                {showAdvanced ? "Hide" : "Show"} Advanced
                            </button>
                            {/* Advanced Options */}
                            {showAdvanced && (
                                <>
                                    <div class="mb-3">
                                        <label
                                            class="form-label"
                                            for="width-input"
                                        >
                                            Key Width
                                        </label>
                                        <div class="input-group">
                                            <input
                                                id="width-input"
                                                class="form-control"
                                                type="number"
                                                min="10"
                                                max="1000"
                                                step="1"
                                                value={width}
                                                onInput={(e) =>
                                                    setWidth(
                                                        parseInt(
                                                            (
                                                                e.target as HTMLInputElement
                                                            ).value
                                                        )
                                                    )
                                                }
                                            />
                                            <span class="input-group-text">
                                                %
                                            </span>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label
                                            class="form-label"
                                            for="shift-input"
                                        >
                                            Offset
                                        </label>
                                        <div class="input-group">
                                            <input
                                                id="shift-input"
                                                class="form-control"
                                                type="number"
                                                min="0"
                                                max="1000"
                                                step="1"
                                                value={shift}
                                                onInput={(e) =>
                                                    setShift(
                                                        parseInt(
                                                            (
                                                                e.target as HTMLInputElement
                                                            ).value
                                                        )
                                                    )
                                                }
                                            />
                                            <span class="input-group-text">
                                                %
                                            </span>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-switch">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="slider-switch"
                                                checked={slider}
                                                onChange={(e) =>
                                                    setSlider(
                                                        (
                                                            e.target as HTMLInputElement
                                                        ).checked
                                                    )
                                                }
                                            />
                                            <label
                                                class="form-check-label"
                                                for="slider-switch"
                                            >
                                                Slider
                                            </label>
                                        </div>

                                        <div class="form-text">
                                            "Slider" keys are keys that will
                                            activate their Left Key and Right
                                            Key inputs by sliding your finger
                                            across the key.
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div class="modal-footer">
                            <div class="d-flex justify-content-between w-100">
                                {/* Delete Key Button */}
                                <button
                                    class="btn btn-outline-danger"
                                    onClick={() => {
                                        props.deleteKey();
                                        props.onClose();
                                    }}
                                >
                                    Delete Key
                                </button>
                                <div>
                                    {/* Save Button */}
                                    <button
                                        class="btn btn-primary me-2"
                                        onClick={() => {
                                            props.updateKey({
                                                ...props.keyData,
                                                shift: shift / 100,
                                                width: width / 100,
                                                key0,
                                                key1,
                                                key2,
                                                key3,
                                                key4,
                                                key5,
                                                key6,
                                                key7,
                                                key8,
                                            });
                                            props.onClose();
                                        }}
                                    >
                                        Save
                                    </button>
                                    {/* Cancel Button */}
                                    <button
                                        class="btn btn-secondary"
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
