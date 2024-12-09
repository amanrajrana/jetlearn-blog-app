import { RowDataPacket } from "mysql2";
import db from "../config/db.config";

class Post {
  id: number | null;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;

  constructor(
    title: string,
    content: string,
    userId: number,
    id: number | null = null,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.createdAt = createdAt; // Will be set when the post is created
  }

  // Create a new post
  static async create(
    title: string,
    content: string,
    userId: number
  ): Promise<Post> {
    const [result] = await db.query(
      "INSERT INTO posts (title, content, user_id, created_at) VALUES (?, ?, ?, NOW())",
      [title, content, userId]
    );

    const id = Number((result as any).insertId); // Get the inserted ID
    return new Post(title, content, userId, id);
  }

  // Fetch a post by ID
  static async findById(id: number): Promise<Post | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );
    const post = rows[0];
    if (!post) return null;

    return new Post(
      post.title,
      post.content,
      post.user_id,
      post.id,
      post.created_at
    );
  }

  // Fetch all posts
  static async findAll(): Promise<Post[]> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM posts");
    return rows.map(
      (row: any) =>
        new Post(row.title, row.content, row.user_id, row.id, row.created_at)
    );
  }

  // Update an existing post
  async update(title: string, content: string): Promise<void> {
    await db.query("UPDATE posts SET title = ?, content = ? WHERE id = ?", [
      title,
      content,
      this.id,
    ]);

    this.title = title;
    this.content = content;
  }

  // Delete a post
  static async delete(id: number): Promise<void> {
    await db.query("DELETE FROM posts WHERE id = ?", [id]);
  }
}

export default Post;
