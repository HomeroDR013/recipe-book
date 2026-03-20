import { useState } from "react";
import { Link } from "react-router-dom";
import { difficultyColor } from "../types";
import type { Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: number) => void;
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite }: RecipeCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/recipes/${recipe.id}`} className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
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
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 hover:bg-white transition-colors text-lg leading-none"
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <span className={isFavorite ? "text-red-500" : "text-gray-400"}>
            {isFavorite ? "♥" : "♡"}
          </span>
        </button>
      </div>
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
    </Link>
  );
}
