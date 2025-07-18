import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const data = await request.json();

    const req = await fetch("http://127.0.0.1:4000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!req.ok) {
        const errorData = await req.json();
        return NextResponse.json(
            { message: errorData.message || "Login Failed" },
            { status: req.status }
        );
    }

    const res = await req.json();

    return NextResponse.json(res);

}