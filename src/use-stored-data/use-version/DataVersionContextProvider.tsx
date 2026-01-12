import {ReactNode, useState} from "react";
import {apply} from "tssentials";
import { DataVersionContext, DataVersionContextType } from "./DataVersionContext.js";

export const DataVersionContextProvider = (props: {children: ReactNode}) => {
    const [state, setState] = useState<DataVersionContextType>({})
    return (
        <DataVersionContext.Provider
            value={{state, addVersion: (k) => setState(s => (
                {...s, [k]: apply(s[k], v => v ? v + 1 : 1)}
            ))}}
        >
            {props.children}
        </DataVersionContext.Provider>
    )
}
