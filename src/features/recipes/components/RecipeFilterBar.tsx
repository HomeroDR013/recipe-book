import type { Category } from "../types";

interface RecipeFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: Category[];
  showFavoritesOnly: boolean;
  onShowFavoritesOnlyChange: (value: boolean) => void;
}

export function RecipeFilterBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  showFavoritesOnly,
  onShowFavoritesOnlyChange,
}: RecipeFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar por nombre o descripción..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => onShowFavoritesOnlyChange(!showFavoritesOnly)}
        className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
          showFavoritesOnly
            ? "border-red-400 bg-red-50 text-red-600"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
      >
        ♥ Favoritos
      </button>
    </div>
  );
}
