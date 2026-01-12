import { useEffect, useState } from "react"
import { useDataVersionContext } from "./DataVersionContext.js"
import { RawWrapper } from "../RawWrapper.js"

type Props<T> = {
    key: string,
    value: RawWrapper<T>,
    load: () => void,
}

export const useVersion = <T>(props: Props<T>) => {
    const {value, key} = props
    const {state: versionContext, addVersion: addContextVersion} = useDataVersionContext()
    const contextVersion = key ? versionContext[key] ?? 0 : 0
    const [version, setVersion] = useState(contextVersion)
    const addVersion = () => {
        setVersion(v => v + 1)
        if (key) addContextVersion(key)
    }
    const loadVersion = () => {
        if (key && contextVersion > version) {
            props.load()
            setVersion(contextVersion)
        }
    }
    useEffect(() => {
        if (key && value.raw !== localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(value.obj))
            addVersion()
        }
    }, [value])
    useEffect(loadVersion, [key, contextVersion])
}