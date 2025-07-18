import { api } from "encore.dev/api";
import sql from "../database";

export const config = api({
    expose: true, path: "/config", method: "GET"
}, async (): Promise<Record<string, string>> => {

    const rows = await sql`SELECT key, value FROM config WHERE visible = true` as { key: string, value: string }[];

    // Turn the Rows into an Object
    const configObj = {} as Record<string, string>;

    for (const row of rows) {
        configObj[row.key] = row.value;
    }

    return configObj;

})