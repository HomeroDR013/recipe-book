## Why

Users can browse and view recipes but cannot contribute new ones. Adding a recipe creation form enables user-generated content, which is essential for a collaborative recipe book. This also establishes the mutation pattern (POST) that future features (edit, delete) will build on.

## What Changes

- New recipe creation form with fields: name, description, ingredients (dynamic add/remove), steps (dynamic add/remove/reorder), category (dropdown from existing categories), difficulty (Fácil/Media/Difícil), prep time, and image URL
- Client-side validation for all required fields with clear Spanish error messages
- New RTK Query `addRecipe` mutation endpoint using `POST /recipes`
- New route `/recipes/new` for the creation form
- Navigation link to the form from the recipe listing page

### In Scope

- Form UI with dynamic lists (ingredients, steps)
- Reordering steps via up/down controls
- Field validation with error messages
- POST to JSON Server and redirect to new recipe on success

### Out of Scope

- Image upload (URL only for now)
- Recipe editing or deletion
- Authentication / ownership of recipes

## Capabilities

### New Capabilities

- `recipe-create-form`: Form component for creating new recipes with dynamic ingredient/step management, category selection, difficulty picker, and field validation

### Modified Capabilities

- `recipe-listing`: Adding a "Nueva receta" navigation link to the listing page header

## Impact

- **New files**: `RecipeCreatePage.tsx` component, `addRecipe` mutation in `recipesApi.ts`
- **Modified files**:
  - `src/features/recipes/api/recipesApi.ts` — new mutation endpoint
  - `src/features/recipes/components/RecipeList.tsx` — add navigation link to create form
  - `src/App.tsx` — new route `/recipes/new`
- **API**: Uses existing `POST /recipes` endpoint (JSON Server supports this out of the box)
- **Dependencies**: React Hook Form + Zod (listed in project conventions but may need `npm install`)
