import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetRecipeByIdQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../api/recipesApi";
import { difficultyColor } from "../types";

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading, error } = useGetRecipeByIdQuery(Number(id));
  const { data: favorites = [] } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [imgError, setImgError] = useState(false);

  const favorite = favorites.find((f) => f.recipeId === Number(id));
  const isFavorite = !!favorite;

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(favorite.id);
    } else {
      addFavorite(Number(id));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Cargando receta...</p>
      </div>
    );
  }

  if (error) {
    const is404 = "status" in error && error.status === 404;
    return (
      <div className="text-center py-20">
        <p className="text-red-600 text-lg">
          {is404 ? "Receta no encontrada" : "Error al cargar la receta"}
        </p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Volver al listado
        </Link>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-blue-600 hover:underline mb-6"
      >
        ← Volver al listado
      </Link>

      {imgError ? (
        <div className="h-80 w-full rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
          Sin imagen
        </div>
      ) : (
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="h-80 w-full rounded-xl object-cover"
          onError={() => setImgError(true)}
        />
      )}

      <div className="mt-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900">{recipe.name}</h2>
          <button
            onClick={handleToggleFavorite}
            className="text-2xl leading-none"
            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <span className={isFavorite ? "text-red-500" : "text-gray-400"}>
              {isFavorite ? "♥" : "♡"}
            </span>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-500">{recipe.category}</span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[recipe.difficulty] ?? "bg-gray-100 text-gray-800"}`}
          >
            {recipe.difficulty}
          </span>
          <span className="text-sm text-gray-500">{recipe.prepTime} min</span>
        </div>

        <p className="mt-4 text-gray-700 leading-relaxed">{recipe.description}</p>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Ingredientes</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Preparación</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
