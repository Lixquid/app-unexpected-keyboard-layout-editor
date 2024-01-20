import { useEffect, useRef, useState } from "preact/hooks";

/** Props for the KeyInput component */
export interface KeyInputProps {
    /** The input value */
    input: string;
    /** Callback to update the input value */
    updateInput: (input: string) => void;
}

const specialKeys = [
    // modifiers: [
    "shift",
    "ctrl",
    "alt",
    "superscript",
    "subscript",
    "ordinal",
    "arrows",
    "box",
    "fn",
    "meta",
    // ],
    // diacritics: [
    "accent_aigu",
    "accent_caron",
    "accent_cedille",
    "accent_circonflexe",
    "accent_grave",
    "accent_macron",
    "accent_ring",
    "accent_tilde",
    "accent_trema",
    "accent_ogonek",
    "accent_dot_above",
    "accent_double_aigu",
    "accent_slash",
    "accent_arrow_right",
    "accent_breve",
    "accent_bar",
    "accent_dot_below",
    "accent_horn",
    "accent_hook_above",
    // ],
    // modes: [
    "config",
    "switch_text",
    "switch_numeric",
    "switch_emoji",
    "switch_back_emoji",
    "switch_forward",
    "switch_backward",
    "switch_greekmath",
    "change_method",
    "change_method_prev",
    // ],
    // common: [
    "action",
    "capslock",
    "esc",
    "enter",
    "up",
    "right",
    "down",
    "left",
    "page_up",
    "page_down",
    "home",
    "end",
    "backspace",
    "delete",
    "insert",
    "tab",
    "\\t",
    "space",
    "nbsp",
    // ],
    // function_keys: [
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "f10",
    "f11",
    "f12",
    "f11_placeholder",
    "f12_placeholder",
    // ],
    // bidi: [
    "lrm",
    "rlm",
    "b(",
    "b)",
    "b[",
    "b]",
    "b{",
    "b}",
    "blt",
    "bgt",
    // ],
    // hebrew: [
    "qamats",
    "patah",
    "sheva",
    "dagesh",
    "hiriq",
    "segol",
    "tsere",
    "holam",
    "qubuts",
    "hataf_patah",
    "hataf_qamats",
    "hataf_segol",
    "shindot",
    "shindot_placeholder",
    "sindot",
    "sindot_placeholder",
    "geresh",
    "gershayim",
    "maqaf",
    "rafe",
    "ole",
    "ole_placeholder",
    "meteg",
    "meteg_placeholder",
    // ],
    // actions: [
    "copy",
    "paste",
    "cut",
    "selectAll",
    "shareText",
    "pasteAsPlainText",
    "undo",
    "redo",
    "replaceText",
    "textAssist",
    "autofill",
    // ],
];

/** An input for modifying a central or corner key */
export function KeyInput(props: KeyInputProps) {
    const [autoComplete, setAutoComplete] = useState<string[]>([]);
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const autoCompleteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Add a click listener to the document to hide the autocomplete
        // suggestions when the user clicks outside the suggestions
        const listener = () => {
            setShowAutoComplete(false);
        };
        document.addEventListener("click", listener);
        return () => document.removeEventListener("click", listener);
    }, []);

    return (
        <div class="position-relative">
            <input
                class="form-control"
                type="text"
                value={props.input ?? ""}
                onInput={(e) => {
                    const value = (e.target as HTMLInputElement).value;
                    let input = value.trim().toLocaleLowerCase();
                    // Strip "loc " from the beginning of the input
                    if (input.startsWith("loc ")) {
                        input = input.slice(4);
                    }
                    if (input.length === 0) {
                        setAutoComplete([]);
                    } else {
                        setAutoComplete(
                            specialKeys.filter((key) =>
                                key.startsWith(input.toLowerCase()),
                            ),
                        );
                    }
                    setShowAutoComplete(true);
                    props.updateInput(value);
                }}
                onFocus={() => setShowAutoComplete(true)}
                onClick={(e) => e.stopPropagation()}
            />
            {autoComplete.length > 0 && showAutoComplete && (
                <div
                    class="position-absolute w-100 top-100 list-group"
                    style={{ zIndex: 1 }}
                    ref={autoCompleteRef}
                >
                    {autoComplete.map((key, i) => (
                        <button
                            class="list-group-item list-group-item-action"
                            onClick={() => {
                                props.updateInput(
                                    (props.input.startsWith("loc ")
                                        ? "loc "
                                        : "") + key,
                                );
                                setAutoComplete([]);
                            }}
                            key={i}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
