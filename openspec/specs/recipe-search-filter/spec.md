### Requirement: Text search filters recipes by name and description
The system SHALL filter the displayed recipes based on a text search input, matching against recipe name and description in a case-insensitive manner.

#### Scenario: Search by name
- **WHEN** the user types "tacos" in the search input
- **THEN** only recipes whose name contains "tacos" (case-insensitive) are displayed

#### Scenario: Search by description
- **WHEN** the user types "cremoso" in the search input
- **THEN** recipes whose description contains "cremoso" (case-insensitive) are displayed

#### Scenario: Clear search
- **WHEN** the user clears the search input
- **THEN** all recipes are displayed (subject to category filter)

### Requirement: Category filter narrows recipes by category
The system SHALL provide a dropdown populated from `GET /categories` that filters recipes by their category.

#### Scenario: Select a category
- **WHEN** the user selects "Desayuno" from the category dropdown
- **THEN** only recipes with category "Desayuno" are displayed

#### Scenario: Show all categories
- **WHEN** the user selects the "all" option in the category dropdown
- **THEN** all recipes are displayed (subject to search filter)

#### Scenario: Categories loaded from API
- **WHEN** the category dropdown renders
- **THEN** its options are populated from the `GET /categories` endpoint

### Requirement: Filters work in combination
The system SHALL apply text search and category filter simultaneously using AND logic.

#### Scenario: Combined filtering
- **WHEN** the user types "queso" in the search input AND selects "Desayuno" as category
- **THEN** only recipes that match both conditions are displayed

### Requirement: Result count display
The system SHALL display the number of recipes matching the current filters.

#### Scenario: Result count shown
- **WHEN** filters are applied and 3 recipes match
- **THEN** the system displays "3 recetas encontradas"

#### Scenario: Single result count
- **WHEN** filters are applied and 1 recipe matches
- **THEN** the system displays "1 receta encontrada"

### Requirement: Filtered empty state
The system SHALL display a specific empty state when filters produce no results, distinct from the "no recipes exist" state.

#### Scenario: No filter results
- **WHEN** the applied filters match zero recipes
- **THEN** the system displays a message indicating no recipes match the current filters
