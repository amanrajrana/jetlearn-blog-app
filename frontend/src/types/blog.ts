export type User = {
  id: number;
  username: string;
  password?: string;
  createdAt?: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: User;
};
