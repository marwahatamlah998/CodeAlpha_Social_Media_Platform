import { CreatePost } from "@/app/models/lib/db/services/posts";
import { NextResponse } from "next/server";


export const POST = async (request : Request) => {
  try {
    const body = await request.json();
    const result = await CreatePost(body);

    return NextResponse.json(
      { data: result, message: "Created Post" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { data: error, message: "Error in Creating Posts" },
      { status: 404 }
    );
  }
};