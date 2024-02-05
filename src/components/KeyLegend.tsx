import { JSX } from "preact/jsx-runtime";

/** Props for the KeyLegend component */
export interface KeyLegendProps {
    /** The legend to display */
    legend: string;
    /** The class to apply to the legend */
    class?: string;
}

// Names sourced from https://github.com/Julow/Unexpected-Keyboard/blob/master/srcs/juloo.keyboard2/KeyValue.java

/** Mapping of legends to bootstrap icons */
const legendIcons: Record<KeyLegendProps["legend"], string> = {
    shift: "shift-fill",
    capslock: "capslock-fill",
    enter: "arrow-return-left",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    page_up: "arrow-up-circle-fill",
    page_down: "arrow-down-circle-fill",
    home: "arrow-left-circle-fill",
    end: "arrow-right-circle-fill",
    backspace: "backspace-fill",
    delete: "backspace-reverse-fill",
    tab: "indent",
    copy: "files",
    cut: "scissors",
    paste: "clipboard-data",
    selectAll: "check2-circle",
    undo: "arrow-counterclockwise",
    redo: "arrow-clockwise",
};

/** Mapping of legends to strings */
const legendStrings: Record<KeyLegendProps["legend"], string> = {
    accent_aigu: "◌́",
    accent_grave: "◌̀",
    accent_double_aigu: "◌̋",
    accent_dot_above: "◌̇",
    accent_circonflexe: "◌̂",
    accent_tilde: "◌̃",
    accent_cedille: "◌̧",
    accent_trema: "◌̈",
    accent_ring: "◌̊",
    accent_caron: "◌̌",
    accent_macron: "◌̄",
    accent_ogonek: "◌̨",
    accent_breve: "◌̆",
    accent_slash: "◌̷",
    accent_bar: "◌̄",
    accent_dot_below: "◌̣",
    accent_hook_above: "◌̉",
    accent_horn: "◌̛",
    switch_greekmath: "πλ∇¬",
    f11_placeholder: "F11",
    f12_placeholder: "F12",
};

/** A single piece of display text for a center / corner of a key */
export function KeyLegend(props: KeyLegendProps) {
    let str = props.legend;
    let cls = props.class;

    // If the str begins with "loc", it's a placeholder for a possible key,
    // so remove the "loc" prefix, and show it differently
    if (str.startsWith("loc ")) {
        str = str.substring(4);
        cls = (cls || "") + " text-dark";
    }

    // Also special case the "f11_placeholder" and "f12_placeholder" legends
    if (str === "f11_placeholder" || str === "f12_placeholder") {
        cls = (cls || "") + " text-dark";
    }

    let content: string | JSX.Element = str;

    if (str in legendStrings) {
        content = legendStrings[str]!;
    } else if (str in legendIcons) {
        content = <i class={`bi bi-${legendIcons[str]}`} />;
    }

    return <span class={cls}>{content}</span>;
}
