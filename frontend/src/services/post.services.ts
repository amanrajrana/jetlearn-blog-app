import { getCookie } from "@/utils/cookie";
import ApiClient from "./apiClient";
import { Post } from "@/types/blog";
import config from "@/config/config";

export interface CreatePostDTO {
  title: string;
  content: string;
}

class PostService {
  private baseUrl = `${config.apiBaseUrl}/api/v1/posts`;

  // Fetch all posts
  async getPosts(): Promise<Post[]> {
    const response = await ApiClient.get<Post[]>(`${this.baseUrl}`);
    return response.data;
  }

  // Fetch a single post by ID
  async getPost(id: number): Promise<Post> {
    const response = await ApiClient.get<Post>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  // Create a new post
  async createPost(data: CreatePostDTO): Promise<Post> {
    const token = getCookie("token");

    const response = await ApiClient.post<Post>(`${this.baseUrl}`, data, {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    return response.data;
  }

  // Update an existing post
  async updatePost(id: number, data: Partial<CreatePostDTO>): Promise<Post> {
    const token = getCookie("token");
    const response = await ApiClient.put<Post>(`${this.baseUrl}/${id}`, data, {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    return response.data;
  }

  // Delete a post
  async deletePost(id: number): Promise<{ message: string }> {
    const token = getCookie("token");

    const response = await ApiClient.delete<{ message: string }>(
      `${this.baseUrl}/${id}`,
      {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    );
    return response.data;
  }
}

// Export an instance of the service
const postService = new PostService();
export default postService;
