export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthResponse {
  status: {
    code: number;
    message: string;
    data: {
      user: User;
      token: string;
    };
  };
}

export interface Recipe {
  id: string;
  title: string;
  cook_time: number;
  prep_time: number;
  ratings: string;
  cuisine: string;
  category: string;
  author: string;
  instructions: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
  total_count: number;
}

export interface RecipeResponse {
  data: Recipe[];
  meta: PaginationMeta;
}
