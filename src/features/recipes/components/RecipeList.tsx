import { useCallback, useMemo, useState } from "react";
import {
  useGetRecipesQuery,
  useGetCategoriesQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../api/recipesApi";
import { RecipeCard } from "./RecipeCard";
import { RecipeCreateDialog } from "./RecipeCreatePage";
import { RecipeFilterBar } from "./RecipeFilterBar";

export function RecipeList() {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: favorites = [] } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const favoriteRecipeIds = useMemo(
    () => new Set(favorites.map((f) => f.recipeId)),
    [favorites]
  );

  const favoriteByRecipeId = useMemo(
    () => new Map(favorites.map((f) => [f.recipeId, f.id])),
    [favorites]
  );

  const handleToggleFavorite = useCallback(
    (recipeId: number) => {
      const favoriteId = favoriteByRecipeId.get(recipeId);
      if (favoriteId !== undefined) {
        removeFavorite(favoriteId);
      } else {
        addFavorite(recipeId);
      }
    },
    [favoriteByRecipeId, addFavorite, removeFavorite]
  );

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    const search = searchTerm.toLowerCase();
    return recipes.filter((recipe) => {
      const matchesSearch =
        !search ||
        recipe.name.toLowerCase().includes(search) ||
        recipe.description.toLowerCase().includes(search);
      const matchesCategory =
        !selectedCategory || recipe.category === selectedCategory;
      const matchesFavorite =
        !showFavoritesOnly || favoriteRecipeIds.has(recipe.id);
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [recipes, searchTerm, selectedCategory, showFavoritesOnly, favoriteRecipeIds]);

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "" || showFavoritesOnly;

  if (isLoading) {
    return <p className="text-center text-gray-500 py-12">Cargando recetas...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600 py-12">
        No se pudieron cargar las recetas. Verifica que el servidor esté corriendo.
      </p>
    );
  }

  if (!recipes || recipes.length === 0) {
    return <p className="text-center text-gray-500 py-12">No hay recetas disponibles.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recetas</h2>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          + Nueva receta
        </button>
      </div>

      <RecipeCreateDialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} />

      <RecipeFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories ?? []}
        showFavoritesOnly={showFavoritesOnly}
        onShowFavoritesOnlyChange={setShowFavoritesOnly}
      />

      <p className="text-sm text-gray-500 mb-4">
        {filteredRecipes.length === 1
          ? "1 receta encontrada"
          : `${filteredRecipes.length} recetas encontradas`}
      </p>

      {filteredRecipes.length === 0 && hasActiveFilters ? (
        <p className="text-center text-gray-500 py-12">
          No se encontraron recetas con los filtros seleccionados.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favoriteRecipeIds.has(recipe.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
