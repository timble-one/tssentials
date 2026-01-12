import z from "zod";
import { RawWrapper } from "./RawWrapper.js";

export const load =
    <SCHEMA extends z.ZodType>(
        key: string, schema: SCHEMA, defaultValue: z.infer<SCHEMA>
    ): RawWrapper<z.infer<SCHEMA>> =>
{
    const v = localStorage.getItem(key)
    return {
        obj: schema.parse(v !== null ? JSON.parse(v) : defaultValue),
        raw: v ?? ''
    }
}
