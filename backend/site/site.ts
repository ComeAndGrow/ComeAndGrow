import { api } from "encore.dev/api";
import sql from "../database";

interface Config {
    key: string; value: string;
}
export const config = api({
    expose: true, path: "/config", method: "GET"
}, async (): Promise<{ values: Config[] }> => {

    const rows = await sql`SELECT key, value FROM config WHERE visible = true` as Config[];

    return { values: rows };

})