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
    const [selectedTemplate, setSelectedTemplate] = useState("");

    return (
        <div class="card mb-5">
            <div class="card-header">
                <h4 class="card-title mb-0">Start from ...</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md mb-3">
                        <label class="form-label" for="keyboard-template">
                            ... a template
                        </label>
                        <select
                            class="form-select"
                            id="keyboard-template"
                            value={selectedTemplate}
                            onChange={(e) => {
                                const template = (e.target as HTMLSelectElement)
                                    .value;
                                setSelectedTemplate(template);
                            }}
                        >
                            {Object.keys(keyboards).map((key) => (
                                <option value={key} key={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        <div class="d-flex justify-content-end align-items-center">
                            <button
                                type="button"
                                class="btn btn-primary mt-2"
                                onClick={() => {
                                    props.setKeyboard(
                                        keyboards[selectedTemplate]
                                    );
                                }}
                                disabled={selectedTemplate.length === 0}
                            >
                                Start with {selectedTemplate}
                            </button>
                        </div>
                    </div>
                    <div class="col-md-auto d-flex flex-column justify-content-center">
                        <span> </span>
                    </div>
                    <div class="col-md mb-3">
                        <label class="form-label" for="keyboard-import">
                        ... <a href="https://github.com/Julow/Unexpected-Keyboard/tree/master/res/xml">... an XML import</a>
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
