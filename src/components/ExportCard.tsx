import { useCallback, useState } from "preact/hooks";
import * as xml2js from "xml2js";
import { KeyboardData, toXmlKeyboard } from "../lib/data";

/** Props for the ExportCard component */
export interface ExportCardProps {
    /** The keyboad data */
    keyboard: KeyboardData;
}

/** Sets the clipboard to the given text using the Clipboard API */
function setClipboard(text: string) {
    navigator.clipboard.writeText(text);
}

/** A card for exporting the keyboard to XML format */
export function ExportCard(props: ExportCardProps) {
    const [xml, setXml] = useState<string>("");

    const exportXml = useCallback(() => {
        const builder = new xml2js.Builder();
        setXml(builder.buildObject(toXmlKeyboard(props.keyboard)));
    }, [props.keyboard, setXml]);

    return (
        <div class="card mt-5">
            <div class="card-header">
                <h4 class="card-title mb-0">Export</h4>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center w-100">
                    <button class="btn btn-primary" onClick={exportXml}>
                        Export to XML
                    </button>
                    <button
                        class="btn btn-secondary"
                        onClick={() => setClipboard(xml)}
                        disabled={!xml}
                    >
                        Copy to Clipboard
                    </button>
                </div>
                {xml && (
                    <div class="card mt-3">
                        <div class="card-body">
                            <pre class="card-text">{xml}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
