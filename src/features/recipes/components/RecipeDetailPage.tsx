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

  const handleShareWhatsApp = () => {
    const message = [
      `${recipe?.name}`,
      `Categoría: ${recipe?.category}`,
      window.location.href,
    ].join("\n");
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

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
          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700 transition-colors"
            aria-label="Compartir por WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Compartir
          </button>
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
