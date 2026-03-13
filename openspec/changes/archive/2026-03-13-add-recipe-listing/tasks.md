## 1. Types and Feature Structure

- [x] 1.1 Create `src/features/recipes/types.ts` with the `Recipe` interface matching the JSON Server data shape (id, name, description, category, difficulty, prepTime, imageUrl, ingredients, steps)
- [x] 1.2 Create the feature directory structure: `src/features/recipes/api/`, `src/features/recipes/components/`

## 2. RTK Query API Slice

- [x] 2.1 Create `src/features/recipes/api/recipesApi.ts` with `createApi`, base URL `http://localhost:3001`, and a `getRecipes` query endpoint returning `Recipe[]`
- [x] 2.2 Register the `recipesApi` reducer and middleware in `src/store/store.ts`

## 3. Recipe Components

- [x] 3.1 Create `src/features/recipes/components/RecipeCard.tsx` — presentational card displaying image (with fallback), name, category, difficulty badge, and prep time using Tailwind CSS
- [x] 3.2 Create `src/features/recipes/components/RecipeList.tsx` — page component that uses the `useGetRecipesQuery` hook and renders a responsive grid of `RecipeCard` components with loading, error, and empty states

## 4. App Integration

- [x] 4.1 Update `src/App.tsx` to render the `RecipeList` component as the main view
