## Context

The recipe listing page currently fetches and displays all recipes via RTK Query. There is no way to search or filter. The mock API already exposes `GET /categories` which returns the category list. Filtering will be done client-side since all recipes are already fetched in a single request.

## Goals / Non-Goals

**Goals:**
- Allow users to search recipes by name/description and filter by category
- Fetch categories from the API via a new RTK Query endpoint
- Apply filters client-side on the already-fetched recipe list
- Show a result count and a filter-aware empty state

**Non-Goals:**
- Server-side filtering or search (JSON Server's full-text search is limited)
- Debounced search (dataset is small, instant filtering is fine)
- URL-based filter state / deep linking
- Sorting or advanced filters (difficulty, prep time)

## Decisions

### 1. Client-side filtering

**Decision**: Filter the already-fetched `recipes` array in the component using `useMemo`, rather than adding query parameters to the API call.

**Why**: All recipes are fetched at once (small dataset). Client-side filtering gives instant feedback with no network roundtrips. JSON Server's `q` parameter does full-text search across all fields which is too broad.

**Alternative considered**: Server-side `?q=` and `?category=` params. Rejected — adds latency for no benefit at this scale and couples filter logic to JSON Server's behavior.

### 2. Filter state management

**Decision**: Use React `useState` hooks in `RecipeList.tsx` for `searchTerm` (string) and `selectedCategory` (string | empty for "all").

**Why**: Filter state is local UI state with no need for global persistence. Lifting to Redux would add unnecessary complexity.

### 3. Categories endpoint

**Decision**: Add a `getCategories` query endpoint to the existing `recipesApi` slice, returning `Category[]` from `GET /categories`.

**Why**: Reuses the existing API slice and base URL configuration. Categories are stable data that RTK Query will cache automatically.

### 4. Component structure

**Decision**: Create a `RecipeFilterBar.tsx` component that renders the search input and category dropdown, receiving values and callbacks as props. `RecipeList.tsx` owns the state and filtering logic.

**Why**: Keeps the filter bar presentational and reusable. `RecipeList` remains the single orchestrator for data fetching, filtering, and rendering.

## Risks / Trade-offs

- **Client-side filtering won't scale** → Acceptable for the current mock dataset. If a real backend is introduced with thousands of recipes, move filtering server-side.
- **No debounce on search** → With 10 recipes, filtering on every keystroke is fine. Add debounce if the dataset grows past ~100 items.
