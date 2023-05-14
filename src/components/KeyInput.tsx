/** Props for the KeyInput component */
export interface KeyInputProps {
    /** The input value */
    input: string;
    /** Callback to update the input value */
    updateInput: (input: string) => void;
    /** The entry this is an input for */
    entry:
        | "key0"
        | "key1"
        | "key2"
        | "key3"
        | "key4"
        | "key5"
        | "key6"
        | "key7"
        | "key8";
}

/** Mapping between key entry and label */
const keyEntryLabels: Record<KeyInputProps["entry"], string> = {
    key0: "Center Key",
    key1: "Top Left Key",
    key2: "Top Right Key",
    key3: "Bottom Left Key",
    key4: "Bottom Right Key",
    key5: "Left Key",
    key6: "Right Key",
    key7: "Top Key",
    key8: "Bottom Key",
};

/** An input for modifying a central or corner key */
export function KeyInput(props: KeyInputProps) {
    return (
        <div class="mb-3">
            <label class="form-label" for={`${props.entry}-input`}>
                {keyEntryLabels[props.entry]}
            </label>
            <input
                id={`${props.entry}-input`}
                class="form-control"
                type="text"
                value={props.input ?? ""}
                onInput={(e) =>
                    props.updateInput(
                        (e.target as HTMLInputElement).value.trim()
                    )
                }
            />
        </div>
    );
}
