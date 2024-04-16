import { NextResponse } from "next/server";
import { mysql } from "mysql2/promise";

export async function POST(req) {
    const payload = await req.json();

    let { number } = payload;

    if (!number) {
        return NextResponse.json({
            status: "error",
            message: "Mobile Parameter Not Receivedd",
        });
    }

    if (![10, 11].includes(number.length)) {
        return NextResponse.json({
            status: "error",
            message: "Number Must be 10/11 Digits ",
        });
    }

    if (number.length === 11 && number.startsWith("0")) {
        number = number.slice(1);
    }

    return NextResponse.json({ number });
}
