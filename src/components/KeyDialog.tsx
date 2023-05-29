import { useState } from "preact/hooks";
import { KeyData } from "../lib/data";
import { KeyLegend } from "./KeyLegend";

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
    const [selectedRegion, setSelectedRegion] = useState<
        | "key0"
        | "key1"
        | "key2"
        | "key3"
        | "key4"
        | "key5"
        | "key6"
        | "key7"
        | "key8"
    >("key0");

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
                            <p class="mb-1">Select a region to edit.</p>
                            <p>
                                The center key is sent when tapping the key, and
                                the surrounding keys are sent when swiping in
                                the direction of those regions.
                            </p>
                            <div class="d-flex justify-content-center mb-3">
                                <div
                                    style={{
                                        position: "relative",
                                        aspectRatio: "1.25/1",
                                        width: "20em",
                                    }}
                                >
                                    <button
                                        class={`btn btn-secondary position-absolute ${
                                            selectedRegion === "key0" &&
                                            "active"
                                        }`}
                                        style={{
                                            top: "30%",
                                            left: "30%",
                                            width: "40%",
                                            height: "40%",
                                        }}
                                        onClick={() =>
                                            setSelectedRegion("key0")
                                        }
                                        title="Tap Input"
                                    >
                                        <KeyLegend legend={key0} />
                                    </button>
                                    <button
                                        class={`btn btn-secondary position-absolute ${
                                            selectedRegion === "key1" &&
                                            "active"
                                        }`}
                                        style={{
                                            top: "0%",
                                            left: "0%",
                                            width: "25%",
                                            height: "25%",
                                        }}
                                        onClick={() =>
                                            setSelectedRegion("key1")
                                        }
                                        title="Swipe Up-Left Input"
                                    >
                                        <KeyLegend legend={key1} />
                                    </button>
                                    <button
                                        class={`btn btn-secondary position-absolute ${
                                            selectedRegion === "key2" &&
                                            "active"
                                        }`}
                                        style={{
                                            top: "0%",
                                            right: "0%",
                                            width: "25%",
                                            height: "25%",
                                        }}
                                        onClick={() =>
                                            setSelectedRegion("key2")
                                        }
                                        title="Swipe Up-Right Input"
                                    >
                                        <KeyLegend legend={key2} />
                                    </button>
                                    <button
                                        class={`btn btn-secondary position-absolute ${
                                            selectedRegion === "key3" &&
                                            "active"
                                        }`}
                                        style={{
                                            bottom: "0%",
                                            left: "0%",
                                            width: "25%",
                                            height: "25%",
                                        }}
                                        onClick={() =>
                                            setSelectedRegion("key3")
                                        }
                                        title="Swipe Down-Left Input"
                                    >
                                        <KeyLegend legend={key3} />
                                    </button>
                                    <button
                                        class={`btn btn-secondary position-absolute ${
                                            selectedRegion === "key4" &&
                                            "active"
                                        }`}
                                        style={{
                                            bottom: "0%",
                                            right: "0%",
                                            width: "25%",
                                            height: "25%",
                                        }}
                                        onClick={() =>
                                            setSelectedRegion("key4")
                                        }
                                        title="Swipe Down-Right Input"
                                    >
                                        <KeyLegend legend={key4} />
                                    </button>
                                    <button
                                        class={`btn btn-secondary position-absolute ${
                                            selectedRegion === "key5" &&
                                            "active"
                                        }`}
                                        style={{
                                            left: "0%",
                                            top: "30%",
                                            width: "25%",
                                            height: "40%",
                                        }}
                                        onClick={() =>
                                            setSelectedRegion("key5")
                                        }
                                        title="Swipe Left Input"
                                    >
                                        <KeyLegend legend={key5} />
                                    </button>
                                    <button
                                        class={`btn btn-secondary position-absolute ${
                                            selectedRegion === "key6" &&
                                            "active"
                                        }`}
                                        style={{
                                            right: "0%",
                                            top: "30%",
                                            width: "25%",
                                            height: "40%",
                                        }}
                                        onClick={() =>
                                            setSelectedRegion("key6")
                                        }
                                        title="Swipe Right Input"
                                    >
                                        <KeyLegend legend={key6} />
                                    </button>
                                    <button
                                        class={`btn btn-secondary position-absolute ${
                                            selectedRegion === "key7" &&
                                            "active"
                                        }`}
                                        style={{
                                            top: "0%",
                                            left: "30%",
                                            width: "40%",
                                            height: "25%",
                                        }}
                                        onClick={() =>
                                            setSelectedRegion("key7")
                                        }
                                        title="Swipe Up Input"
                                    >
                                        <KeyLegend legend={key7} />
                                    </button>
                                    <button
                                        class={`btn btn-secondary position-absolute ${
                                            selectedRegion === "key8" &&
                                            "active"
                                        }`}
                                        style={{
                                            bottom: "0%",
                                            left: "30%",
                                            width: "40%",
                                            height: "25%",
                                        }}
                                        onClick={() =>
                                            setSelectedRegion("key8")
                                        }
                                        title="Swipe Down Input"
                                    >
                                        <KeyLegend legend={key8} />
                                    </button>
                                </div>
                            </div>

                            <div class="mb-3">
                                <input
                                    class="form-control"
                                    type="text"
                                    value={
                                        selectedRegion === "key0"
                                            ? key0
                                            : selectedRegion === "key1"
                                            ? key1
                                            : selectedRegion === "key2"
                                            ? key2
                                            : selectedRegion === "key3"
                                            ? key3
                                            : selectedRegion === "key4"
                                            ? key4
                                            : selectedRegion === "key5"
                                            ? key5
                                            : selectedRegion === "key6"
                                            ? key6
                                            : selectedRegion === "key7"
                                            ? key7
                                            : selectedRegion === "key8"
                                            ? key8
                                            : ""
                                    }
                                    onInput={(e) => {
                                        const value = (
                                            e.target as HTMLInputElement
                                        ).value;
                                        switch (selectedRegion) {
                                            case "key0":
                                                setKey0(value);
                                                break;
                                            case "key1":
                                                setKey1(value);
                                                break;
                                            case "key2":
                                                setKey2(value);
                                                break;
                                            case "key3":
                                                setKey3(value);
                                                break;
                                            case "key4":
                                                setKey4(value);
                                                break;
                                            case "key5":
                                                setKey5(value);
                                                break;
                                            case "key6":
                                                setKey6(value);
                                                break;
                                            case "key7":
                                                setKey7(value);
                                                break;
                                            case "key8":
                                                setKey8(value);
                                                break;
                                        }
                                    }}
                                />
                            </div>

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
