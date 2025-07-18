import { api, APIError, ErrCode, Header } from "encore.dev/api";
import sql from "../database";

interface RegistrationParams {
    username: string;
    password: string;
    email: string;
    ip: Header<"x-forwarded-for">;
}

export const register = api(
    { expose: true, method: "POST", path: "/register" },
    async ({ username, password, email, ip }: RegistrationParams): Promise<{
        message: string;
        status: 0 | 1
    }> => {

        if (username.length < 3 || username.length > 50)
            throw new APIError(ErrCode.InvalidArgument, "Username must be between 3 and 50 characters.");

        if (username.match(/[^a-zA-Z0-9_]/))
            throw new APIError(ErrCode.InvalidArgument, "Username can only contain letters, numbers, and underscores.");

        if (password.length < 8 || password.length > 255)
            throw new APIError(ErrCode.InvalidArgument, "Password must be between 8 and 255 characters.");

        // Check if Username or Email was already used
        const foundUserNameOrEmail = await sql`SELECT id FROM users WHERE username = ${username.toLowerCase()} OR email = ${email}`;

        if (foundUserNameOrEmail.length)
            throw new APIError(ErrCode.PermissionDenied, "Username or Email was already used");

        await sql`INSERT INTO users (username, password, email, ip)
            VALUES (${username.toLowerCase()}, ${password}, ${email}, ${ip}) ON CONFLICT (username) DO NOTHING RETURNING *`;

        return {
            message: `User ${username} registered successfully!`,
            status: 1
        };
    }
);