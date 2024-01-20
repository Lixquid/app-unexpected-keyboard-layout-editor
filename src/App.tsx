import { useState } from "preact/hooks";
import { ExportCard } from "./components/ExportCard";
import { KeyboardDialog } from "./components/KeyboardDialog";
import { NewCard } from "./components/NewCard";
import { Row } from "./components/Row";
import { KeyboardData, newRow } from "./lib/data";
import { qwerty } from "./lib/keyboards";
import { HistoryQueue, useInitRef } from "./lib/util";

/** Toggles bootstrap theme between light and dark */
function toggleDarkMode() {
    const html = document.querySelector("html");
    if (html !== null) {
        html.dataset.bsTheme =
            html.dataset.bsTheme === "dark" ? "light" : "dark";
    }
}

const HISTORY_SIZE = 100;

export function App() {
    const [keyboard, setKeyboardRaw] = useState<KeyboardData>(qwerty);
    const [showKeyboardDialog, setShowKeyboardDialog] = useState(false);
    const kbHistory = useInitRef(
        () => new HistoryQueue<KeyboardData>(keyboard, HISTORY_SIZE),
    );

    function setKeyboard(kb: KeyboardData) {
        kbHistory.current.add(kb);
        setKeyboardRaw(kb);
    }

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
                <p class="lead mb-5">
                    A layout editor for the{" "}
                    <a href="https://github.com/Julow/Unexpected-Keyboard">
                        Unexpected Keyboard
                    </a>{" "}
                    for Android devices. Get it on{" "}
                    <a href="https://play.google.com/store/apps/details?id=juloo.keyboard2">
                        Google Play
                    </a>{" "}
                    or{" "}
                    <a href="https://f-droid.org/packages/juloo.keyboard2/">
                        F-Droid
                    </a>
                    .
                </p>
                <NewCard setKeyboard={setKeyboard} />
                <div class="card" style={{ minWidth: "50rem" }}>
                    <div class="card-header">
                        <h4 class="mb-0">Keyboard Layout</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <button
                                    class="btn btn-outline-secondary me-2"
                                    onClick={() => {
                                        setKeyboardRaw(
                                            kbHistory.current.undo(),
                                        );
                                    }}
                                    disabled={kbHistory.current.atOldest}
                                >
                                    <i class="bi bi-arrow-counterclockwise me-2" />
                                    Undo
                                </button>
                                <button
                                    class="btn btn-outline-secondary"
                                    onClick={() => {
                                        setKeyboardRaw(
                                            kbHistory.current.redo(),
                                        );
                                    }}
                                    disabled={kbHistory.current.atNewest}
                                >
                                    <i class="bi bi-arrow-clockwise me-2" />
                                    Redo
                                </button>
                            </div>
                            <button
                                class="btn btn-outline-primary"
                                onClick={() => setShowKeyboardDialog(true)}
                                title="Keyboard Settings"
                            >
                                <i class="bi bi-gear-fill me-2" />
                                Keyboard Settings
                            </button>
                        </div>
                        <hr />
                        {keyboard.rows.map((row, i) => (
                            <Row
                                rowData={row}
                                updateRow={(row) =>
                                    setKeyboard({
                                        ...keyboard,
                                        rows: keyboard.rows.map((r, j) =>
                                            j === i ? row : r,
                                        ),
                                    })
                                }
                                deleteRow={() =>
                                    setKeyboard({
                                        ...keyboard,
                                        rows: keyboard.rows.filter(
                                            (_, j) => j !== i,
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
                        <i class="bi bi-box-arrow-up-right me-2" />
                        Source code
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
