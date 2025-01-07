export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
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
  ingredients: Ingredient[];
  instructions: string | null;
  image_url: string | null;
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

export interface RecipeMatch {
  recipe: Recipe;
  score: number;
  missing_ingredients: Ingredient[];
}

export interface MatchResponse {
  matched_recipes: RecipeMatch[];
  total_matches: number;
  meta: PaginationMeta;
}
