import { useState } from "react";
import type { Recipe } from "../types";

const difficultyColor: Record<string, string> = {
  "Fácil": "bg-green-100 text-green-800",
  "Media": "bg-yellow-100 text-yellow-800",
  "Difícil": "bg-red-100 text-red-800",
};

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {imgError ? (
        <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
          Sin imagen
        </div>
      ) : (
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="h-48 w-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">{recipe.category}</span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[recipe.difficulty] ?? "bg-gray-100 text-gray-800"}`}
          >
            {recipe.difficulty}
          </span>
          <span className="text-sm text-gray-500">{recipe.prepTime} min</span>
        </div>
      </div>
    </div>
  );
}
