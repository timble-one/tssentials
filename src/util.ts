export const processIfPresent = <T, R>(v: T | null | undefined, callback: (v: T) => R): R | undefined =>
    (v != null && v != undefined) ? callback(v) : undefined
;
