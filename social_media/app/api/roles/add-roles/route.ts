import { AddRole } from "@/app/models/lib/db/services/roles";
import { NextResponse } from "next/server";

export const POST = async(request: Request) => {
  try {
    const body = await request.json();
    const result = await AddRole(body);
    return NextResponse.json(result, {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(
      { msg: `Failed ${error.message}` },
      {
        status: 404,
      },
    );
  }
};
