## 1. Types and API

- [x] 1.1 Add `Category` interface to `src/features/recipes/types.ts`
- [x] 1.2 Add `getCategories` query endpoint to `src/features/recipes/api/recipesApi.ts` returning `Category[]` from `GET /categories`

## 2. Filter Bar Component

- [x] 2.1 Create `src/features/recipes/components/RecipeFilterBar.tsx` with a text search input and a category dropdown (populated from categories prop), receiving values and onChange callbacks as props

## 3. Filtering Logic and Integration

- [x] 3.1 Update `src/features/recipes/components/RecipeList.tsx` to add `searchTerm` and `selectedCategory` state, fetch categories with `useGetCategoriesQuery`, and render `RecipeFilterBar`
- [x] 3.2 Add client-side filtering logic in `RecipeList.tsx` using `useMemo` — filter by name/description (case-insensitive) AND category, display result count ("X recetas encontradas")
- [x] 3.3 Update empty state in `RecipeList.tsx` to distinguish between "no recipes exist" and "no recipes match filters"
