## 1. Dependencies

- [x] 1.1 Install `react-hook-form`, `zod`, and `@hookform/resolvers` via npm

## 2. Types & API

- [x] 2.1 Add `addRecipe` mutation endpoint to `recipesApi.ts` using `POST /recipes`, with `"Recipe"` tag type and list invalidation
- [x] 2.2 Add `providesTags: [{ type: "Recipe", id: "LIST" }]` to the existing `getRecipes` query so the list refreshes after creation

## 3. Form Component

- [x] 3.1 Create `RecipeCreateDialog` in `RecipeCreatePage.tsx` as a centered `<dialog>` modal with React Hook Form setup and Zod validation schema (name min 3 chars, description required, prepTime > 0, imageUrl optional valid URL, at least 1 ingredient, at least 1 step)
- [x] 3.2 Implement static form fields: name, description, category dropdown (from `useGetCategoriesQuery`), difficulty dropdown (Fácil/Media/Difícil), prep time, image URL
- [x] 3.3 Implement dynamic ingredients list using `useFieldArray` with add/remove buttons
- [x] 3.4 Implement dynamic steps list using `useFieldArray` with add/remove/move-up/move-down buttons
- [x] 3.5 Implement form submission: call `addRecipe` mutation, close dialog, navigate to `/recipes/:id` on success, show error message on failure, disable submit button while loading
- [x] 3.6 Implement dialog dismissal: Cancel button, close (✕) button, and Escape key all close the dialog and reset the form

## 4. Integration

- [x] 4.1 Add "Nueva receta" button to `RecipeList.tsx` that opens the dialog via local state
- [x] 4.2 Render `RecipeCreateDialog` in `RecipeList` with `open`/`onClose` props

## 5. Verification

- [x] 5.1 Visual verification: click "Nueva receta", fill all fields, add/remove/reorder ingredients and steps, submit, and confirm dialog closes and redirects to the new recipe detail page
- [x] 5.2 Validation verification: submit empty form and confirm all error messages appear in Spanish next to their fields
