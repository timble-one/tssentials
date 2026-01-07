import {z} from "zod";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {apply} from "../util.js";
import {useDataVersionContext} from "./version/DataVersionContext.js";

type RawWrapper<T> = {obj: T, raw: string}
const isUpdater = <T>(value: SetStateAction<T>): value is (prev: T) => T =>
    typeof value === 'function'

const load =
    <SCHEMA extends z.ZodType>(
        key: string, schema: SCHEMA, defaultValue: z.infer<SCHEMA>
    ): RawWrapper<z.infer<SCHEMA>> =>
    apply(localStorage.getItem(key), v => ({
        obj: schema.parse(v !== null ? JSON.parse(v) : defaultValue),
        raw: v ?? ''
    }))

export const useStoredData =
    (key?: string) =>
    <SCHEMA extends z.ZodType>(schema: SCHEMA, defaultValue: z.infer<SCHEMA>)
    : [z.infer<SCHEMA>, Dispatch<SetStateAction<z.infer<SCHEMA>>>, () => void] =>
{
    const [state, setState] = useState<RawWrapper<z.infer<SCHEMA>>>(key
        ? load<SCHEMA>(key, schema, defaultValue)
        : {obj: defaultValue, raw: ''}
    )
    const {state: versionContext, addVersion: addContextVersion} = useDataVersionContext()
    const contextVersion = key ? versionContext[key] ?? 0 : 0
    const [version, setVersion] = useState(contextVersion)

    const addVersion = () => {
        setVersion(v => v + 1)
        if (key) addContextVersion(key)
    }

    const loadVersion = () => {
        if (key && contextVersion > version) {
            setState(load(key, schema, defaultValue))
            setVersion(contextVersion)
        }
    }

    useEffect(() => {
        if (key && state.raw !== localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(state.obj))
            addVersion()
        }
    }, [state])
    useEffect(loadVersion, [key, contextVersion])

    return [
        state.obj,                                                                         // state
        (a: SetStateAction<z.infer<SCHEMA>>) => isUpdater(a)                         // setState
            ? setState(s => ({obj: a(s.obj), raw: ''}))
            : setState(() => ({obj: a, raw: ''})),
        () => setState({obj: defaultValue, raw: ''}),                                // reset
    ]
}
