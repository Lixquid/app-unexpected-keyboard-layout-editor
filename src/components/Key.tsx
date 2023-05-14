import { useState } from "preact/hooks";
import { KeyData } from "../lib/data";
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
}

/** A single key on the keyboard that supports editing */
export function Key(props: KeyProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <button
                class="btn btn-secondary position-relative h-100"
                onClick={() => setDialogOpen(true)}
                style={{
                    width: props.keyData.width * 10 + "%",
                    marginLeft: props.keyData.shift * 10 + "%",
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
