import { z } from "zod";

//#region Data Structures

/** Data structure for a single key. */
export interface KeyData {
    /** Width of the key. Defaults to 1. */
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
    /** The name of the keyboard. */
    name: string;
    /** The writing script of the keyboard. */
    script: string;
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
        name: "Custom Layout",
        script: "",
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
            row.keys.reduce((sum, key) => sum + key.width + key.shift, 0),
        ),
    );
}
//#endregion

//#region Serialization

/* xml2js parses xml out to objects where attributes are stored in the `$` key,
   and child elements are stored in the child element's name. */

const xmlSchema = z.object({
    keyboard: z.object({
        $: z
            .object({
                name: z.string().optional(),
                script: z.string().optional(),
                bottom_row: z.coerce.boolean().optional(),
                /** Deprecated alias for `bottom_row`. */
                bottomRow: z.coerce.boolean().optional(),
                width: z.coerce.number().positive().optional(),
            })
            .transform((o) => ({
                name: o.name,
                script: o.script,
                width: o.width,
                bottom_row: o.bottom_row ?? o.bottomRow,
            }))
            .optional(),
        row: z.array(
            z.object({
                $: z
                    .object({
                        height: z.coerce.number().positive().optional(),
                        shift: z.coerce.number().positive().optional(),
                    })
                    .optional(),
                key: z.array(
                    z.object({
                        $: z.object({
                            width: z.coerce.number().positive().optional(),
                            shift: z.coerce.number().positive().optional(),
                            key0: z.string().optional(),
                            key1: z.string().optional(),
                            key2: z.string().optional(),
                            key3: z.string().optional(),
                            key4: z.string().optional(),
                            key5: z.string().optional(),
                            key6: z.string().optional(),
                            key7: z.string().optional(),
                            key8: z.string().optional(),
                            slider: z.coerce.boolean().optional(),
                        }),
                    }),
                ),
            }),
        ),
    }),
});
export type XmlKeyboard = z.infer<typeof xmlSchema>;

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
                bottom_row: data.bottomRow ? undefined : false,
                width: data.width,
                name: str(data.name),
                script: data.script !== "" ? str(data.script) : undefined,
            },
            row: data.rows.map((row) => ({
                $: {
                    height: row.height !== 1 ? row.height : undefined,
                    shift: row.shift !== 0 ? row.shift : undefined,
                },
                key: row.keys.map((key) => ({
                    $: {
                        width: key.width !== 1 ? key.width : undefined,
                        shift: key.shift !== 0 ? key.shift : undefined,
                        slider: key.slider ? true : undefined,

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
    function str(value: string | undefined, defaultValue = ""): string {
        if (value === undefined) return defaultValue;
        if (
            value.length === 2 &&
            value[0] === "\\" &&
            androidEscapeChars.test(value[1]!)
        ) {
            return value[1]!;
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
        name: str(xml.keyboard?.$?.name, "Custom Layout"),
        script: str(xml.keyboard?.$?.script),
        rows: xml.keyboard.row.map((row) => ({
            height: row.$?.height ?? 1,
            shift: row.$?.shift ?? 0,
            keys: row.key.map((key) => ({
                width: key.$.width ?? 1,
                shift: key.$.shift ?? 0,
                key0: str(key.$.key0),
                key1: str(key.$.key1),
                key2: str(key.$.key2),
                key3: str(key.$.key3),
                key4: str(key.$.key4),
                key5: str(key.$.key5),
                key6: str(key.$.key6),
                key7: str(key.$.key7),
                key8: str(key.$.key8),
                slider: key.$.slider ?? false,
            })),
        })),
        bottomRow: xml.keyboard.$?.bottom_row ?? true,
        width: xml.keyboard.$?.width,
    };
}

/** Returns `undefined` if an object is an {@link XmlKeyboard}, otherwise an error message. */
export function isXmlKeyboard(xml: unknown): string | undefined {
    const result = xmlSchema.safeParse(xml);
    if (!result.success) {
        return result.error.message;
    }
    return undefined;
}

//#endregion
