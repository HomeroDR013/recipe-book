## MODIFIED Requirements

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
