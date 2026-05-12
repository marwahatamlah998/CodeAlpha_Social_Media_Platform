import { getPostByUserID } from "@/app/models/lib/db/services/posts";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  },
) => {
  const { id } = await params.params;
  const result = await getPostByUserID(+id);
  return NextResponse.json(result, {
    status: 200,
  });
};
