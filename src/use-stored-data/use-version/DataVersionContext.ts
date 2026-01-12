import {createContext, useContext} from "react";

export type DataVersionContextType = Record<string, number>

export const DataVersionContext = createContext<{
    state: DataVersionContextType,
    addVersion: (key: string) => void
} | undefined>(undefined)

export const useDataVersionContext = () => {
    const context = useContext(DataVersionContext)
    if (context) {
        return context
    } else {
        throw new Error('DataVersionContext is missing')
    }
}