import { api, APIError, ErrCode } from "encore.dev/api";
import jwt from "jsonwebtoken";
import sql from "../database";

export const login = api(
    { expose: true, method: "POST", path: "/login" },
    async ({ username, password }: { username: string; password: string }): Promise<{ status: boolean, token: string }> => {

        const user = await sql`
            SELECT id, username, email FROM users WHERE username = ${username.toLowerCase()} AND password = ${password}
        `;

        if (!user.length) {
            throw new APIError(ErrCode.PermissionDenied, "Invalid username or password");
        }

        const userWithoutPassword = user[0];

        const token = jwt.sign(
            userWithoutPassword,
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "7d" }
        );

        await sql`UPDATE users SET last_login = ${Date.now()} WHERE id = ${userWithoutPassword.id}`;

        return {
            status: true,
            token
        };

    }
);