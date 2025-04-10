export const processIfPresent = <T, R>
    (v: T | null | undefined, callback: (v: T) => R)
    : R | undefined =>
    (v != null && v != undefined) ? callback(v) : undefined

export const ifPresent = processIfPresent

export const apply = <T, R>
    (v: T, callback: (v: T) => R)
    : R =>
    callback(v)
