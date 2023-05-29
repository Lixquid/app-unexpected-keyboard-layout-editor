import { useMemo, useState } from "preact/hooks";
import { KeyData, KeyboardData, getKeyboardWidth } from "../lib/data";
import { KeyDialog } from "./KeyDialog";
import { KeyLegend } from "./KeyLegend";

/** Props for the Key component */
export interface KeyProps {
    /** The key data */
    keyData: KeyData;
    /** Callback to update the key data */
    updateKey: (key: KeyData) => void;
    /** Callback to delete the key */
    deleteKey: () => void;
    /** The entire keyboard data */
    keyboardData: KeyboardData;
}

/** A single key on the keyboard that supports editing */
export function Key(props: KeyProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const keyboardWidth = useMemo(
        () => getKeyboardWidth(props.keyboardData),
        [props.keyboardData]
    );

    return (
        <>
            <button
                class="btn btn-secondary position-relative h-100"
                onClick={() => setDialogOpen(true)}
                style={{
                    width: (props.keyData.width / keyboardWidth) * 100 + "%",
                    marginLeft:
                        (props.keyData.shift / keyboardWidth) * 100 + "%",
                }}
            >
                <KeyLegend legend={props.keyData.key0} />
                {props.keyData.key1 && (
                    <KeyLegend
                        legend={props.keyData.key1}
                        class="position-absolute top-0 start-0 px-1"
                    />
                )}
                {props.keyData.key2 && (
                    <KeyLegend
                        legend={props.keyData.key2}
                        class="position-absolute top-0 end-0 px-1"
                    />
                )}
                {props.keyData.key3 && (
                    <KeyLegend
                        legend={props.keyData.key3}
                        class="position-absolute bottom-0 start-0 px-1"
                    />
                )}
                {props.keyData.key4 && (
                    <KeyLegend
                        legend={props.keyData.key4}
                        class="position-absolute bottom-0 end-0 px-1"
                    />
                )}
                {props.keyData.key5 && (
                    <KeyLegend
                        legend={props.keyData.key5}
                        class="position-absolute top-50 start-0 translate-middle-y px-1"
                    />
                )}
                {props.keyData.key6 && (
                    <KeyLegend
                        legend={props.keyData.key6}
                        class="position-absolute top-50 end-0 translate-middle-y px-1"
                    />
                )}
                {props.keyData.key7 && (
                    <KeyLegend
                        legend={props.keyData.key7}
                        class="position-absolute top-0 start-50 translate-middle-x px-1"
                    />
                )}
                {props.keyData.key8 && (
                    <KeyLegend
                        legend={props.keyData.key8}
                        class="position-absolute bottom-0 start-50 translate-middle-x px-1"
                    />
                )}
            </button>
            {dialogOpen && (
                <KeyDialog
                    keyData={props.keyData}
                    updateKey={props.updateKey}
                    deleteKey={props.deleteKey}
                    onClose={() => setDialogOpen(false)}
                />
            )}
        </>
    );
}
