import { RowDataPacket } from "mysql2";
import db from "../config/db.config";

class Post {
  id: number | null;
  title: string;
  content: string;
  user: { id: number; username: string } | null; // Add this property
  createdAt: Date;

  constructor(
    title: string,
    content: string,
    id: number | null = null,
    createdAt: Date = new Date(),
    user: { id: number; username: string } | null // Add this property
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.user = user;
    this.createdAt = createdAt; // Will be set when the post is created
  }

  // Create a new post
  static async create(
    title: string,
    content: string,
    userId: number
  ): Promise<Post> {
    const [result] = await db.query(
      "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
      [title, content, userId]
    );

    const id = Number((result as any).insertId); // Get the inserted ID
    return new Post(title, content, id, new Date(), {
      id: userId,
      username: "",
    });
  }

  // Fetch a post by ID
  static async findById(id: number): Promise<Post | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT 
         posts.*, 
         users.id AS userId, 
         users.username 
       FROM posts 
       JOIN users ON posts.user_id = users.id 
       WHERE posts.id = ?`,
      [id]
    );
    const post = rows[0];
    if (!post) return null;

    return new Post(post.title, post.content, post.id, post.created_at, {
      id: post.userId,
      username: post.username,
    });
  }

  // Fetch all posts
  static async findAll(): Promise<Post[]> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT 
         posts.*, 
         users.id AS userId, 
         users.username 
       FROM posts 
       JOIN users ON posts.user_id = users.id`
    );

    return rows.map(
      (row: any) =>
        new Post(
          row.title,
          row.content,
          row.id,
          row.created_at,
          { id: row.userId, username: row.username } // Include user details
        )
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
