import pool from "@/app/models/lib/db";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type Post = {
  id?: number;
  created_at?: Timestamp;
  subject: string;
  description: string;
  author?: number;
  image_urls: [];
  is_deleted?: boolean;
};

export const CreatePost = async (post: Post) => {
  const result = await pool.query<Post>(
    "INSERT INTO posts (subject , description , image_urls, author) VALUES ($1 , $2 , $3 , $4 ) RETURNING *",
    [post.subject, post.description, post.image_urls, 12],
  );
  const posts = result.rows[0];
  if (posts) {
    return {
      id: posts.id,
      subject: posts.subject,
      description: posts.description,
      images_urls: posts.image_urls,
      author: posts.author,
      created_at: posts.created_at,
      is_deleted: posts.is_deleted,
    };
  } else {
    throw new Error("Please check data");
  }
};



export const getPostByUserID = async (id: number) => {
  const result = await pool.query(
    "SELECT * FROM posts WHERE author = $1",
    [id]
  );
  return result.rows;
};
