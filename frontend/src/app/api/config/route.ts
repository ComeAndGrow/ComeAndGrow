import { NextResponse } from "next/server";

export async function GET() {

    const req = await fetch("http://127.0.0.1:4000/config");

    if (!req.ok) {
        const errorData = await req.json();
        return NextResponse.json(
            { message: errorData.message || "Config retrieval Failed" },
            { status: req.status }
        );
    }

    const res = await req.json();

    return NextResponse.json(res);
}