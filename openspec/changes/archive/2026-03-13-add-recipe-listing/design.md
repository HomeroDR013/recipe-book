## Context

The Recipe Book app has its foundational infrastructure (Vite, Redux Toolkit, Tailwind CSS v4, JSON Server) but zero user-facing features. The recipe listing is the first feature to be built. The mock API at `http://localhost:3001/recipes` returns an array of recipe objects with fields: `id`, `name`, `description`, `category`, `difficulty`, `prepTime`, `ingredients`, `steps`, `imageUrl`.

## Goals / Non-Goals

**Goals:**
- Fetch recipes from the mock API using RTK Query
- Display recipes in a responsive card grid showing image, name, category, difficulty, and prep time
- Handle loading and error states gracefully
- Establish the feature-based folder structure pattern for future features

**Non-Goals:**
- Recipe detail view (separate change)
- Filtering, sorting, or search functionality
- Pagination or infinite scroll
- Recipe creation or editing
- Category fetching (not needed for listing cards)

## Decisions

### 1. RTK Query API slice location

**Decision**: Create `src/features/recipes/api/recipesApi.ts` as the API slice with `createApi`.

**Why**: Follows the feature-based architecture convention. The API slice lives within the feature that owns it, keeping related code colocated. A single `recipesApi` with `baseUrl: 'http://localhost:3001'` is sufficient — future endpoints (categories, single recipe) can be injected into the same API slice.

**Alternative considered**: A global `src/store/api.ts` shared across features. Rejected because there's only one feature so far, and premature abstraction adds complexity without benefit.

### 2. Component structure

**Decision**: Two components inside `src/features/recipes/components/`:
- `RecipeList.tsx` — page-level component that calls the RTK Query hook, handles loading/error states, renders the grid
- `RecipeCard.tsx` — presentational card component receiving a single recipe as props

**Why**: Clean separation between data-fetching orchestration and presentation. `RecipeCard` stays reusable and testable in isolation.

### 3. Styling approach

**Decision**: Use Tailwind CSS v4 utility classes directly in JSX. Responsive grid via `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` pattern.

**Why**: Tailwind is already configured. Utility-first approach keeps styles colocated with markup and avoids an extra CSS abstraction layer.

### 4. Recipe type definition

**Decision**: Define a `Recipe` TypeScript interface in `src/features/recipes/types.ts` matching the JSON Server data shape.

**Why**: Single source of truth for the recipe shape, used by both the API slice and components.

## Risks / Trade-offs

- **Hardcoded base URL** → For now, the API URL is hardcoded to `http://localhost:3001`. This is acceptable for a mock-API project. If a real backend is introduced later, extract to an environment variable.
- **No image fallback** → Recipe `imageUrl` fields may point to placeholder URLs that don't load. Mitigation: add an `onError` handler on `<img>` to show a fallback placeholder.
- **No pagination** → All recipes are fetched at once. Acceptable for a small dataset (JSON Server mock). Revisit if the dataset grows significantly.
