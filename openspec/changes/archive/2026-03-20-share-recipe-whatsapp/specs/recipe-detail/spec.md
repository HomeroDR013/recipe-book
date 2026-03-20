## ADDED Requirements

### Requirement: WhatsApp share action in recipe detail
The recipe detail page SHALL include a WhatsApp share button alongside the existing recipe metadata (category, difficulty, prep time).

#### Scenario: Share button placement
- **WHEN** the recipe detail page displays a recipe
- **THEN** a WhatsApp share button is visible in the metadata/actions area of the page

#### Scenario: Share button not shown during loading
- **WHEN** the recipe data is still loading
- **THEN** the WhatsApp share button SHALL NOT be displayed
