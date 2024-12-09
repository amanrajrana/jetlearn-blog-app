import { ResultSetHeader } from "mysql2";
import db from "../config/db.config";
import { userSchemaType } from "../schema/user.schema";

type User = userSchemaType & {
  id: number;
  created_at?: Date;
};

/**
 * The UserModel class provides static methods to interact with the users table in the database.
 * It includes methods to create, find, update, and delete user records.
 */
class UserModel {
  /**
   * Creates a new user in the database.
   *
   * @param username - The username of the new user.
   * @param password - The password of the new user.
   * @returns A promise that resolves to the ID of the newly created user.
   */
  static async create(username: string, password: string): Promise<number> {
    const [result]: any = await db.query<ResultSetHeader>(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );
    return result.insertId;
  }

  /**
   * Finds a user by their ID.
   *
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the user object if found, or null if not found.
   */
  static async findById(id: number): Promise<User | null> {
    const [rows]: any = await db.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    return rows.length ? rows[0] : null;
  }

  /**
   * Finds a user by their ID.
   *
   * @param username - username.
   * @returns A promise that resolves to the user object if found, or null if not found.
   */
  static async findByUsername(username: string): Promise<User | null> {
    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Retrieves all users from the database.
   *
   * @returns A promise that resolves to an array of user objects.
   */
  static async findAll(): Promise<User[]> {
    const [rows]: any = await db.query("SELECT * FROM users");
    return rows;
  }

  /**
   * Deletes a user from the database.
   *
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  static async delete(id: number): Promise<void> {
    // TODO: Delete all post of this user
    await db.query("DELETE FROM users WHERE id = ?", [id]);
  }
}

export default UserModel;
