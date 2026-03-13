### Requirement: Fetch all recipes from the API
The system SHALL fetch the complete list of recipes from `GET /recipes` using an RTK Query endpoint when the recipe listing page mounts.

#### Scenario: Successful fetch
- **WHEN** the recipe listing page loads
- **THEN** the system fetches all recipes from `http://localhost:3001/recipes` and displays them

#### Scenario: API error
- **WHEN** the API request to `/recipes` fails
- **THEN** the system displays an error message indicating recipes could not be loaded

#### Scenario: Loading state
- **WHEN** the API request is in progress
- **THEN** the system displays a loading indicator

### Requirement: Display recipes as cards in a grid
The system SHALL render each recipe as a card within a responsive grid layout. When no recipes match the current filters, the system SHALL display a filter-specific empty state. When no recipes exist at all (API returns empty array), the system SHALL display a general empty state.

#### Scenario: Grid responsiveness
- **WHEN** the user views the recipe listing on different screen sizes
- **THEN** the grid displays 1 column on mobile, 2 columns on small screens, and 3 columns on large screens

#### Scenario: Empty state (no recipes exist)
- **WHEN** the API returns an empty array of recipes
- **THEN** the system displays a message indicating no recipes are available

#### Scenario: Empty state (no filter matches)
- **WHEN** recipes exist but current filters match zero recipes
- **THEN** the system displays a message indicating no recipes match the current filters

### Requirement: Recipe card displays key metadata
Each recipe card SHALL display the recipe image, name, category, difficulty, and preparation time.

#### Scenario: Card content
- **WHEN** a recipe card is rendered
- **THEN** it displays the recipe's image, name, category label, difficulty badge, and preparation time

#### Scenario: Image fallback
- **WHEN** a recipe card's image fails to load
- **THEN** the card displays a placeholder image instead of a broken image icon

### Requirement: Store integration
The RTK Query API slice SHALL be registered in the Redux store with its reducer and middleware.

#### Scenario: Store configuration
- **WHEN** the application initializes
- **THEN** the Redux store includes the `recipesApi` reducer and its middleware in the middleware chain
