import { useState } from "preact/hooks";
import { ExportCard } from "./components/ExportCard";
import { KeyboardDialog } from "./components/KeyboardDialog";
import { NewCard } from "./components/NewCard";
import { Row } from "./components/Row";
import { KeyboardData, newRow } from "./lib/data";
import { qwerty } from "./lib/keyboards";

/** Toggles bootstrap theme between light and dark */
function toggleDarkMode() {
    const html = document.querySelector("html");
    if (html !== null) {
        html.dataset.bsTheme =
            html.dataset.bsTheme === "dark" ? "light" : "dark";
    }
}

export function App() {
    const [keyboard, setKeyboard] = useState<KeyboardData>(qwerty);
    const [showKeyboardDialog, setShowKeyboardDialog] = useState(false);

    console.log(JSON.stringify(keyboard));

    return (
        <>
            <div class="container mx-auto py-5">
                <div class="d-flex justify-content-between align-items-center mb-5 flex-wrap">
                    <h1>Unexpected Keyboard Layout Editor</h1>
                    <div>
                        <button
                            class="btn btn-outline-secondary me-2"
                            onClick={toggleDarkMode}
                            title="Toggle dark mode"
                        >
                            <i class="bi bi-moon-fill" />
                        </button>
                        <a
                            href="https://lixquid.com"
                            class="btn btn-outline-primary float-end"
                        >
                            <i class="bi bi-box-arrow-up-right me-2" />
                            lixquid.com
                        </a>
                    </div>
                </div>
                <NewCard setKeyboard={setKeyboard} />
                <div class="card" style={{ minWidth: "50rem" }}>
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <h4 class="mb-0">Keyboard Layout</h4>
                            <button
                                class="btn btn-outline-primary px-4"
                                onClick={() => setShowKeyboardDialog(true)}
                                title="Keyboard Settings"
                            >
                                <i class="bi bi-gear-fill" />
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        {keyboard.rows.map((row, i) => (
                            <Row
                                rowData={row}
                                updateRow={(row) =>
                                    setKeyboard({
                                        ...keyboard,
                                        rows: keyboard.rows.map((r, j) =>
                                            j === i ? row : r
                                        ),
                                    })
                                }
                                deleteRow={() =>
                                    setKeyboard({
                                        ...keyboard,
                                        rows: keyboard.rows.filter(
                                            (_, j) => j !== i
                                        ),
                                    })
                                }
                                key={i}
                                keyboardData={keyboard}
                            />
                        ))}
                        {/* Add Row Button */}
                        <button
                            class="btn btn-outline-success w-100 mt-3"
                            onClick={() => {
                                setKeyboard({
                                    ...keyboard,
                                    rows: [...keyboard.rows, newRow()],
                                });
                            }}
                        >
                            <i class="bi bi-plus-lg me-2" />
                            Add Row
                        </button>
                    </div>
                </div>
                <ExportCard keyboard={keyboard} />
                <div class="mt-5 text-end">
                    <a href="https://github.com/lixquid/app-unexpected-keyboard-layout-editor">
                        <i class="bi bi-github me-2" />
                        GitHub
                    </a>
                </div>
            </div>
            {showKeyboardDialog && (
                <KeyboardDialog
                    keyboard={keyboard}
                    setKeyboard={setKeyboard}
                    onClose={() => setShowKeyboardDialog(false)}
                />
            )}
        </>
    );
}
