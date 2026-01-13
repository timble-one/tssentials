import {z} from "zod";
import {Dispatch, SetStateAction, useState} from "react";
import { RawWrapper } from "./RawWrapper.js";
import { load } from "./load.js";
import { isUpdater } from "./isUpdater.js";
import { useVersion } from "./use-version/useVersion.js";


type StoredState<Schema extends z.ZodTypeAny> = [
  z.infer<Schema>,
  Dispatch<SetStateAction<z.infer<Schema>>>,
  () => void,
]

export const useStoredData = 
    (key?: string) =>
    <SCHEMA extends z.ZodType>(
        schema: SCHEMA,
        defaultValue: z.infer<SCHEMA>
    ): StoredState<SCHEMA> =>
{
    const [state, setState] = useState<RawWrapper<z.infer<SCHEMA>>>(key
        ? load<SCHEMA>(key, schema, defaultValue)
        : {obj: defaultValue, raw: ''}
    )
    useVersion({key, value: state, load: () => setState(load(key, schema, defaultValue))})
    const setter = (a: SetStateAction<z.infer<SCHEMA>>) => {
        return setState(s => {
            const next = isUpdater(a) ? a(s.obj) : a;
            const result = schema.safeParse(next);
            return { obj: result.success ? result.data : s.obj, raw: '' };
        });
    }
    const resetter = () => setState({obj: defaultValue, raw: ''})
    return [state.obj, setter, resetter]
}
