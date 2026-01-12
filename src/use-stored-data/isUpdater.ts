import { SetStateAction } from "react";

export const isUpdater = <T>(value: SetStateAction<T>): value is (prev: T) => T =>
    typeof value === 'function'