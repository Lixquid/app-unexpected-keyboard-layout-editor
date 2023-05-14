import { useState } from "preact/hooks";
import * as xml2js from "xml2js";
import { KeyboardData, fromXmlKeyboard } from "../lib/data";
import { keyboards } from "../lib/keyboards";

/** Props for the NewCard component */
export interface NewCardProps {
    /** Function to set the keyboard */
    setKeyboard: (keyboard: KeyboardData) => void;
}

/** A card to create a new keyboard */
export function NewCard(props: NewCardProps) {
    const [importText, setImportText] = useState("");
    const [error, setError] = useState<string | null>(null);

    return (
        <div class="card mb-5">
            <div class="card-header">
                <h4 class="card-title mb-0">New keyboard</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md mb-3">
                        <label class="form-label" for="keyboard-template">
                            Start from a template
                        </label>
                        <select
                            class="form-select"
                            id="keyboard-template"
                            onChange={(e) => {
                                const template = (e.target as HTMLSelectElement)
                                    .value;
                                props.setKeyboard(keyboards[template]);
                            }}
                        >
                            {Object.keys(keyboards).map((key) => (
                                <option value={key} key={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="col-md-auto d-flex flex-column justify-content-center">
                        <span>or</span>
                    </div>
                    <div class="col-md mb-3">
                        <label class="form-label" for="keyboard-import">
                            Import from XML
                        </label>
                        <textarea
                            class={`form-control ${
                                error !== null ? "is-invalid" : ""
                            }`}
                            id="keyboard-import"
                            rows={3}
                            onChange={(e) => {
                                setImportText(
                                    (e.target as HTMLTextAreaElement).value
                                );
                            }}
                        />
                        <div class="d-flex justify-content-end align-items-center">
                            <button
                                class="btn btn-primary mt-2"
                                onClick={async () => {
                                    try {
                                        const result =
                                            await xml2js.parseStringPromise(
                                                importText
                                            );
                                        const k = result;
                                        console.log(k);
                                        props.setKeyboard(fromXmlKeyboard(k));
                                        setError(null);
                                    } catch (e: unknown) {
                                        console.error(e);
                                        setError(
                                            "Error parsing XML: " +
                                                (e as Error).message
                                        );
                                    }
                                }}
                                disabled={importText.length === 0}
                            >
                                Import
                            </button>
                        </div>
                        {error !== null && (
                            <div class="invalid-feedback">{error}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
