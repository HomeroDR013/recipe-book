export interface Category {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  category: string;
  difficulty: string;
  prepTime: number;
  imageUrl: string;
}
