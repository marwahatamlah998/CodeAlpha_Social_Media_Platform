import { Register } from "@/app/models/lib/db/services/users";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await Register(body);
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
