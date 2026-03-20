## Context

The recipe book currently supports read-only operations: listing, filtering, searching, and viewing recipe details. All data fetching uses RTK Query with `fetchBaseQuery` pointing at JSON Server on port 3001. JSON Server already supports `POST /recipes` out of the box, so the backend is ready.

The project conventions specify React Hook Form + Zod for forms and validation. These dependencies need to be installed (`react-hook-form`, `zod`, `@hookform/resolvers`).

## Goals / Non-Goals

**Goals:**
- Enable users to create new recipes through a validated form
- Follow existing project patterns (RTK Query mutations, feature-based structure, Tailwind styling)
- Provide a smooth UX with dynamic lists for ingredients and steps

**Non-Goals:**
- Recipe editing or deletion (future changes)
- Image upload — URL input only
- Draft saving or auto-save
- Rich text editing for steps or description

## Decisions

### 1. Form library: React Hook Form + Zod

**Decision:** Use React Hook Form with Zod schema validation via `@hookform/resolvers`.

**Rationale:** This is the project's stated convention. React Hook Form provides performant uncontrolled inputs with minimal re-renders. Zod provides type-safe schema validation that integrates cleanly with TypeScript.

**Alternative considered:** Manual `useState` per field — rejected because managing validation, error state, and dynamic arrays manually would be significantly more complex and error-prone.

### 2. Dynamic lists via `useFieldArray`

**Decision:** Use React Hook Form's `useFieldArray` hook for ingredients and steps lists.

**Rationale:** `useFieldArray` handles add/remove/reorder operations with proper form state tracking, validation per item, and no custom state management needed. It integrates directly with the form's validation schema.

**Alternative considered:** Custom array state alongside the form — rejected because it splits form state management and complicates validation.

### 3. Modal dialog instead of separate page

**Decision:** Build the form as a centered `<dialog>` modal (`RecipeCreateDialog`) triggered from the recipe listing page, rather than a dedicated route.

**Rationale:** A modal keeps the user in context — the listing page remains visible behind the backdrop. It avoids route conflicts with `/recipes/:id` and feels more polished for a creation flow. The native HTML `<dialog>` element with `showModal()` provides built-in backdrop, focus trapping, and Escape-to-close behavior.

**Alternative considered:** Separate page at `/recipes/new` — implemented initially but replaced by the dialog approach for better UX. Multi-step wizard — rejected as over-engineered for the current field count.

### 5. Mutation with cache invalidation

**Decision:** Add an `addRecipe` mutation to the existing `recipesApi` that invalidates the recipe list cache on success.

**Rationale:** Follows the same pattern established by the favorites feature. After creating a recipe, the listing page should show the new entry without manual cache manipulation. Use tag-based invalidation with a new `"Recipe"` tag type.

### Architecture Decisions

**File structure:**

| File | Action | Purpose |
|------|--------|---------|
| `src/features/recipes/components/RecipeCreatePage.tsx` | **New** | `RecipeCreateDialog` modal component with form and validation |
| `src/features/recipes/api/recipesApi.ts` | **Modify** | Add `addRecipe` mutation, add `"Recipe"` tag type |
| `src/features/recipes/components/RecipeList.tsx` | **Modify** | Add "Nueva receta" button that opens the dialog, render `RecipeCreateDialog` |

## Risks / Trade-offs

- **[New dependencies]** → Adding `react-hook-form`, `zod`, and `@hookform/resolvers` increases bundle size. Mitigation: these are standard, well-maintained libraries with good tree-shaking; the project conventions already plan for their use.
- **[JSON Server ID generation]** → JSON Server auto-generates numeric IDs. The new recipe will get the next available integer, which could conflict if `db.json` is manually edited. Mitigation: acceptable for a mock API; a real backend would use UUIDs or database sequences.
- **[No optimistic update]** → Unlike favorites, recipe creation redirects to the new recipe page, so optimistic updates aren't needed. The redirect happens after the server confirms success.
