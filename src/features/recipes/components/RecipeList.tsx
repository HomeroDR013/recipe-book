import { useGetRecipesQuery } from "../api/recipesApi";
import { RecipeCard } from "./RecipeCard";

export function RecipeList() {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
