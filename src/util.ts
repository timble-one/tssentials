export const processIfPresent = <T, R>
    (v: T | null | undefined, callback: (v: T) => R)
    : R | undefined =>
    (v != null && v != undefined) ? callback(v) : undefined

export const ifPresent = processIfPresent

export const apply = <T, R>
    (v: T, callback: (v: T) => R)
    : R =>
    callback(v)

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}
