import { useRef } from "preact/hooks";

/** Capitalize the first letter of a string. */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * A queue that can add items, and track a history pointer.
 *
 * Adding an item will clear all items ahead of the history pointer, and
 * add the item to the end of the queue.
 */
export class HistoryQueue<T> {
    /** The queue of items. */
    private queue: T[];

    /** The current history pointer position. */
    private pointer = 0;

    /** The maximum number of items to store. */
    private maxItems: number;

    constructor(initial: T, maxItems: number) {
        this.maxItems = maxItems;
        this.queue = [initial];
    }

    /** Returns if the history pointer is at the newest change. */
    get atNewest(): boolean {
        return this.pointer === this.queue.length - 1;
    }

    /** Returns if the history pointer is at the oldest change. */
    get atOldest(): boolean {
        return this.pointer === 0;
    }

    /** Moves the history pointer to a change one step older, and returns the item. */
    undo(): T {
        if (this.atOldest) return this.queue[0]!;
        this.pointer--;
        return this.queue[this.pointer]!;
    }

    /** Moves the history pointer to a change one step newer, and returns the item. */
    redo(): T {
        if (this.atNewest) return this.queue[this.queue.length - 1]!;
        this.pointer++;
        return this.queue[this.pointer]!;
    }

    /** Adds a new item to the queue, clearing all items ahead of the history pointer, and removing the oldest item if the queue is full. */
    add(item: T): void {
        this.queue.splice(this.pointer + 1);
        this.queue.push(item);
        if (this.queue.length > this.maxItems) {
            this.queue.shift();
            this.pointer--;
        }
        this.pointer++;
    }
}

/**
 * A hook that returns a ref that is initialized with a callback. This is
 * useful for initializing refs to elements that are expensive to create.
 * @param init The callback to initialize the ref.
 * @returns A function that returns the ref.
 */
export function useInitRef<T>(init: () => T): { current: T } {
    const ref = useRef<T | null>(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref as { current: T };
}
