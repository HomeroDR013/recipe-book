## Why

The Recipe Book app has its infrastructure in place (Redux store, Tailwind CSS, JSON Server mock API) but no user-facing features yet. The recipe listing is the core entry point of the application — users need to browse available recipes before they can do anything else.

## What Changes

- Add an RTK Query API slice (`recipesApi`) with a `getRecipes` endpoint that fetches from `GET /recipes`
- Create a `RecipeCard` component that displays recipe image, name, category, difficulty badge, and prep time
- Create a `RecipeList` page component that renders all recipes as a responsive card grid
- Wire the Redux store with the new API slice middleware and reducer
- Set up the main app layout to render the recipe listing as the default view

## Capabilities

### New Capabilities

- `recipe-listing`: Fetching and displaying all recipes in a browsable card grid with key metadata (image, name, category, difficulty, prep time)

### Modified Capabilities

_(none — this is the first feature)_

## Impact

- **Store**: `store.ts` gains the `recipesApi` reducer and middleware
- **Features**: New `features/recipes/` directory with API slice, components, and types
- **Shared**: New shared UI components (card, badge) in `shared/components/`
- **API dependency**: Requires JSON Server running on `http://localhost:3001`
