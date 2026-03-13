import { useMemo, useState } from "react";
import { useGetRecipesQuery, useGetCategoriesQuery } from "../api/recipesApi";
import { RecipeCard } from "./RecipeCard";
import { RecipeFilterBar } from "./RecipeFilterBar";

export function RecipeList() {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();
  const { data: categories } = useGetCategoriesQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, selectedCategory]);

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "";

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
      <RecipeFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories ?? []}
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
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
