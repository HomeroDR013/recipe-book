## Why

The recipe listing currently shows all recipes with no way to find a specific one. As the recipe collection grows, users need to quickly narrow down results by searching text or filtering by category.

## What Changes

- Add a text search input that filters recipes by name and description (case-insensitive)
- Add a category dropdown populated from `GET /categories` to filter recipes by category
- Both filters work in combination (text search AND category filter)
- Display a results counter showing "X recetas encontradas"
- Show a dedicated empty state when filters produce no results (distinct from the "no recipes" state)

## Capabilities

### New Capabilities

- `recipe-search-filter`: Text search and category-based filtering of the recipe listing, including category fetching, combined filter logic, result count, and filtered empty state

### Modified Capabilities

- `recipe-listing`: The empty state requirement changes — the listing must now distinguish between "no recipes exist" and "no recipes match current filters"

## Impact

- **API**: New RTK Query endpoint for `GET /categories`
- **Features**: New filter components in `features/recipes/components/`, filter state management
- **Existing components**: `RecipeList.tsx` will integrate the filter bar and apply filtering logic
- **Types**: New `Category` interface in `features/recipes/types.ts`
