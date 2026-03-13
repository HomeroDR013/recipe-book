## MODIFIED Requirements

### Requirement: Recipe card displays key metadata
Each recipe card SHALL display the recipe image, name, category, difficulty, and preparation time. Each card SHALL be a clickable link that navigates to the recipe detail page at `/recipes/:id`.

#### Scenario: Card content
- **WHEN** a recipe card is rendered
- **THEN** it displays the recipe's image, name, category label, difficulty badge, and preparation time

#### Scenario: Image fallback
- **WHEN** a recipe card's image fails to load
- **THEN** the card displays a placeholder image instead of a broken image icon

#### Scenario: Card navigation
- **WHEN** the user clicks on a recipe card
- **THEN** the system navigates to `/recipes/:id` where `:id` is the recipe's ID

#### Scenario: Card link accessibility
- **WHEN** a recipe card is rendered
- **THEN** the card uses a semantic `<Link>` element so it supports right-click open in new tab and keyboard navigation
