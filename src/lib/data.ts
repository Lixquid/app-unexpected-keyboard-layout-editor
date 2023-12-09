//#region Data Structures
/** Data structure for a single key. */
export interface KeyData {
    /** Width of the key. Rows have a total width of 10. Defaults to 1. */
    width: number;
    /** Horizontal offset of the key. Defaults to 0. */
    shift: number;
    /** The main insert sequence of the key. */
    key0: string;
    /** The top-left insert sequence of the key. */
    key1: string;
    /** The top-right insert sequence of the key. */
    key2: string;
    /** The bottom-left insert sequence of the key. */
    key3: string;
    /** The bottom-right insert sequence of the key. */
    key4: string;
    /** The left insert sequence of the key. */
    key5: string;
    /** The right insert sequence of the key. */
    key6: string;
    /** The top insert sequence of the key. */
    key7: string;
    /** The bottom insert sequence of the key. */
    key8: string;
    /**
     * If this key can activate its {@link key5} or {@link key6} sequences by
     * swiping.
     */
    slider: boolean;
}

/** Data structure for a single row. */
export interface RowData {
    /** Height of the row. Defaults to 1. */
    height: number;
    /** Amount of padding to add above the row. Defaults to 0. */
    shift: number;
    /** Keys in the row. */
    keys: KeyData[];
}

/** Data structure for a keyboard. */
export interface KeyboardData {
    /** Rows in the keyboard. */
    rows: RowData[];
    /** If the default bottom row should be added. */
    bottomRow: boolean;
    /** A width that overrides each row's width. */
    width?: number;
}
//#endregion

//#region Constructors
/** Create a default {@link KeyData}. */
export function newKey(): KeyData {
    return {
        shift: 0,
        width: 1,
        key0: "",
        key1: "",
        key2: "",
        key3: "",
        key4: "",
        key5: "",
        key6: "",
        key7: "",
        key8: "",
        slider: false,
    };
}

/** Create a default {@link RowData}. */
export function newRow(): RowData {
    return {
        height: 1,
        shift: 0,
        keys: [],
    };
}

/** Create a default {@link KeyboardData}. */
export function newKeyboard(): KeyboardData {
    return {
        rows: [],
        bottomRow: true,
    };
}
//#endregion

//#region Utility Functions
/** Returns the width for a keyboard. */
export function getKeyboardWidth(data: KeyboardData): number {
    // If a width is specified, use that.
    if (data.width !== undefined) return data.width;
    // Otherwise, find the widest row.
    return Math.max(
        ...data.rows.map((row) =>
            row.keys.reduce((sum, key) => sum + key.width + key.shift, 0)
        )
    );
}
//#endregion

//#region Serialization
/** A xml2js target keyboard data structure. */
export interface XmlKeyboard {
    keyboard: {
        $: {
            bottomRow?: string;
            bottom_row?: string;
            width?: string;
        };
        row: {
            $: {
                height?: string;
                shift?: string;
            };
            key: {
                $: {
                    width?: string;
                    shift?: string;
                    key0?: string;
                    key1?: string;
                    key2?: string;
                    key3?: string;
                    key4?: string;
                    key5?: string;
                    key6?: string;
                    key7?: string;
                    key8?: string;
                    slider?: string;
                };
            }[];
        }[];
    };
}

// A set of characters that need to be escaped in android XML files.
const androidEscapeChars = /^[@#\\?]$/;

/** Convert a {@link KeyboardData} to a {@link XmlKeyboard}. */
export function toXmlKeyboard(data: KeyboardData): XmlKeyboard {
    function str(value: unknown): string {
        const v = String(value);
        if (androidEscapeChars.test(v)) {
            return "\\" + v;
        }
        return v;
    }

    return {
        keyboard: {
            $: {
                bottom_row: data.bottomRow ? undefined : "false",
                width: data.width ? str(data.width) : undefined,
            },
            row: data.rows.map((row) => ({
                $: {
                    height: row.height !== 1 ? str(row.height) : undefined,
                    shift: row.shift !== 0 ? str(row.shift) : undefined,
                },
                key: row.keys.map((key) => ({
                    $: {
                        width: key.width !== 1 ? str(key.width) : undefined,
                        shift: key.shift !== 0 ? str(key.shift) : undefined,
                        slider: key.slider ? "true" : undefined,

                        key0: key.key0 !== "" ? str(key.key0) : undefined,
                        key1: key.key1 !== "" ? str(key.key1) : undefined,
                        key2: key.key2 !== "" ? str(key.key2) : undefined,
                        key3: key.key3 !== "" ? str(key.key3) : undefined,
                        key4: key.key4 !== "" ? str(key.key4) : undefined,
                        key5: key.key5 !== "" ? str(key.key5) : undefined,
                        key6: key.key6 !== "" ? str(key.key6) : undefined,
                        key7: key.key7 !== "" ? str(key.key7) : undefined,
                        key8: key.key8 !== "" ? str(key.key8) : undefined,
                    },
                })),
            })),
        },
    };
}

/** Convert a {@link XmlKeyboard} to a {@link KeyboardData}. */
export function fromXmlKeyboard(xml: XmlKeyboard): KeyboardData {
    function str(value: string | undefined): string {
        if (value === undefined) return "";
        if (
            value.length === 2 &&
            value[0] === "\\" &&
            androidEscapeChars.test(value[1])
        ) {
            return value[1];
        }
        return value;
    }
    function num(value: string | undefined): number | undefined {
        if (value === undefined) return undefined;
        const v = parseFloat(value);
        if (isNaN(v)) return undefined;
        return v;
    }

    return {
        rows: xml.keyboard.row.map((row) => ({
            height: (typeof row.$ === "object" && num(row.$.height)) || 1,
            shift: (typeof row.$ === "object" && num(row.$.shift)) || 0,
            keys: row.key.map((key) => ({
                width: num(key.$.width) || 1,
                shift: num(key.$.shift) || 0,
                key0: str(key.$.key0),
                key1: str(key.$.key1),
                key2: str(key.$.key2),
                key3: str(key.$.key3),
                key4: str(key.$.key4),
                key5: str(key.$.key5),
                key6: str(key.$.key6),
                key7: str(key.$.key7),
                key8: str(key.$.key8),
                slider: key.$.slider === "true",
            })),
        })),
        bottomRow:
            typeof xml.keyboard.$ === "object" &&
            (xml.keyboard.$.bottom_row === "false" ||
            xml.keyboard.$.bottomRow === "false"
                ? false
                : true),
        width:
            (typeof xml.keyboard.$ === "object" && num(xml.keyboard.$.width)) ||
            undefined,
    };
}

/** Returns `undefined` if an object is an {@link XmlKeyboard}, otherwise an error message. */
export function isXmlKeyboard(xml: unknown): string | undefined {
    function isArray(obj: unknown): obj is unknown[] {
        return Array.isArray(obj);
    }

    if (typeof xml !== "object" || xml === null) {
        return "Not an xml object";
    }

    if (
        !("keyboard" in xml) ||
        xml.keyboard === null ||
        typeof xml.keyboard !== "object"
    ) {
        return "Top level element is not a keyboard";
    }

    if ("$" in xml.keyboard) {
        if (xml.keyboard.$ === null || typeof xml.keyboard.$ !== "object") {
            return "Keyboard attributes are not an object";
        }

        if (
            "bottom_row" in xml.keyboard.$ &&
            typeof xml.keyboard.$.bottom_row !== "string"
        ) {
            return "Keyboard bottom_row attribute is not a string";
        }

        if (
            "bottomRow" in xml.keyboard.$ &&
            typeof xml.keyboard.$.bottomRow !== "string"
        ) {
            return "Keyboard bottomRow attribute is not a string";
        }

        if (
            "width" in xml.keyboard.$ &&
            typeof xml.keyboard.$.width !== "string"
        ) {
            return "Keyboard width attribute is not a string";
        }
    }

    if (!("row" in xml.keyboard) || !isArray(xml.keyboard.row)) {
        return "Keyboard is missing rows";
    }

    for (const row of xml.keyboard.row) {
        if (typeof row !== "object" || row === null) {
            return "Row is not an object";
        }

        if ("$" in row) {
            if (row.$ === null || typeof row.$ !== "object") {
                return "Row is missing attributes";
            }

            if ("height" in row.$ && typeof row.$.height !== "string") {
                return "Row height attribute is not a string";
            }

            if ("shift" in row.$ && typeof row.$.shift !== "string") {
                return "Row shift attribute is not a string";
            }
        }

        if (!("key" in row) || !isArray(row.key)) {
            return "Row is missing keys";
        }

        for (const key of row.key) {
            if (typeof key !== "object" || key === null) {
                return "Key is not an object";
            }

            if (!("$" in key) || key.$ === null || typeof key.$ !== "object") {
                return "Key is missing attributes";
            }

            if ("width" in key.$ && typeof key.$.width !== "string") {
                return "Key width attribute is not a string";
            }

            if ("shift" in key.$ && typeof key.$.shift !== "string") {
                return "Key shift attribute is not a string";
            }

            if ("slider" in key.$ && typeof key.$.slider !== "string") {
                return "Key slider attribute is not a string";
            }

            if ("key0" in key.$ && typeof key.$.key0 !== "string") {
                return "Key key0 attribute is not a string";
            }

            if ("key1" in key.$ && typeof key.$.key1 !== "string") {
                return "Key key1 attribute is not a string";
            }

            if ("key2" in key.$ && typeof key.$.key2 !== "string") {
                return "Key key2 attribute is not a string";
            }

            if ("key3" in key.$ && typeof key.$.key3 !== "string") {
                return "Key key3 attribute is not a string";
            }

            if ("key4" in key.$ && typeof key.$.key4 !== "string") {
                return "Key key4 attribute is not a string";
            }

            if ("key5" in key.$ && typeof key.$.key5 !== "string") {
                return "Key key5 attribute is not a string";
            }

            if ("key6" in key.$ && typeof key.$.key6 !== "string") {
                return "Key key6 attribute is not a string";
            }

            if ("key7" in key.$ && typeof key.$.key7 !== "string") {
                return "Key key7 attribute is not a string";
            }

            if ("key8" in key.$ && typeof key.$.key8 !== "string") {
                return "Key key8 attribute is not a string";
            }
        }
    }

    return undefined;
}

//#endregion
