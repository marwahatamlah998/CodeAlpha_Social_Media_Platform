import { AddRole } from "@/app/models/lib/db/services/roles";
import { NextResponse } from "next/server";

export const POST = async(request: Request) => {
  try {
    const body = await request.json();
    console.log(body)
    const result = await AddRole(body);
    return NextResponse.json(result, {
      status: 201,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { msg: `Failed ${error.message}` },
      {
        status: 404,
      },
    );
  }
};

