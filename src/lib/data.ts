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
                bottomRow: data.bottomRow ? undefined : "false",
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
                key0: key.$.key0 || "",
                key1: key.$.key1 || "",
                key2: key.$.key2 || "",
                key3: key.$.key3 || "",
                key4: key.$.key4 || "",
                key5: key.$.key5 || "",
                key6: key.$.key6 || "",
                key7: key.$.key7 || "",
                key8: key.$.key8 || "",
                slider: key.$.slider === "true",
            })),
        })),
        bottomRow:
            typeof xml.keyboard.$ === "object" &&
            xml.keyboard.$.bottomRow === "false"
                ? false
                : true,
        width:
            (typeof xml.keyboard.$ === "object" && num(xml.keyboard.$.width)) ||
            undefined,
    };
}

/** Checks if an unknown object is a {@link XmlKeyboard}. */
export function isXmlKeyboard(xml: unknown): xml is XmlKeyboard {
    return (
        typeof xml === "object" &&
        xml !== null &&
        typeof (xml as XmlKeyboard).keyboard === "object" &&
        (xml as XmlKeyboard).keyboard !== null &&
        typeof (xml as XmlKeyboard).keyboard.row === "object" &&
        (xml as XmlKeyboard).keyboard.row !== null &&
        Array.isArray((xml as XmlKeyboard).keyboard.row) &&
        (xml as XmlKeyboard).keyboard.row.every(
            (row) =>
                typeof row === "object" &&
                row !== null &&
                typeof row.key === "object" &&
                row.key !== null &&
                Array.isArray(row.key) &&
                row.key.every(
                    (key) =>
                        typeof key === "object" &&
                        key !== null &&
                        typeof key.$ === "object" &&
                        key.$ !== null &&
                        (typeof key.$.width === "undefined" ||
                            typeof key.$.width === "string") &&
                        (typeof key.$.shift === "undefined" ||
                            typeof key.$.shift === "string") &&
                        (typeof key.$.key0 === "undefined" ||
                            typeof key.$.key0 === "string") &&
                        (typeof key.$.key1 === "undefined" ||
                            typeof key.$.key1 === "string") &&
                        (typeof key.$.key2 === "undefined" ||
                            typeof key.$.key2 === "string") &&
                        (typeof key.$.key3 === "undefined" ||
                            typeof key.$.key3 === "string") &&
                        (typeof key.$.key4 === "undefined" ||
                            typeof key.$.key4 === "string") &&
                        (typeof key.$.key5 === "undefined" ||
                            typeof key.$.key5 === "string") &&
                        (typeof key.$.key6 === "undefined" ||
                            typeof key.$.key6 === "string") &&
                        (typeof key.$.key7 === "undefined" ||
                            typeof key.$.key7 === "string") &&
                        (typeof key.$.key8 === "undefined" ||
                            typeof key.$.key8 === "string") &&
                        (typeof key.$.slider === "undefined" ||
                            typeof key.$.slider === "string")
                ) &&
                typeof row.$ === "object" &&
                row.$ !== null &&
                (typeof row.$.height === "undefined" ||
                    typeof row.$.height === "string") &&
                (typeof row.$.shift === "undefined" ||
                    typeof row.$.shift === "string")
        ) &&
        typeof (xml as XmlKeyboard).keyboard.$ === "object" &&
        (xml as XmlKeyboard).keyboard.$ !== null &&
        (typeof (xml as XmlKeyboard).keyboard.$.bottomRow === "undefined" ||
            typeof (xml as XmlKeyboard).keyboard.$.bottomRow === "string") &&
        (typeof (xml as XmlKeyboard).keyboard.$.width === "undefined" ||
            typeof (xml as XmlKeyboard).keyboard.$.width === "string")
    );
}
//#endregion
