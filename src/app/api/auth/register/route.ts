import {NextRequest, NextResponse} from "next/server";
import {NextApiRequest} from "next";

export async function GET(request: NextRequest) {

    const data =await  request.json()

    if (data) {
        console.log(JSON.stringify(data))
    }

    return NextResponse.json(data)
}