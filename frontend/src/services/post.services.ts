import ApiClient from "./apiClient";

// Define Types
export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
}

export interface CreatePostDTO {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostDTO {
  title?: string;
  body?: string;
}

// Service Implementation
class PostService {
  private baseUrl = "/api/v1/posts";

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
    const response = await ApiClient.post<Post>(`${this.baseUrl}`, data);
    return response.data;
  }

  // Update an existing post
  async updatePost(id: number, data: UpdatePostDTO): Promise<Post> {
    const response = await ApiClient.put<Post>(`${this.baseUrl}/${id}`, data);

    return response.data;
  }

  // Delete a post
  async deletePost(id: number): Promise<{ message: string }> {
    const response = await ApiClient.delete<{ message: string }>(
      `${this.baseUrl}/${id}`
    );
    return response.data;
  }
}

// Export an instance of the service
const postService = new PostService();
export default postService;