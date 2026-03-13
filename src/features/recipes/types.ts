export interface Category {
  id: number;
  name: string;
}

export const difficultyColor: Record<string, string> = {
  "Fácil": "bg-green-100 text-green-800",
  "Media": "bg-yellow-100 text-yellow-800",
  "Difícil": "bg-red-100 text-red-800",
};

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
