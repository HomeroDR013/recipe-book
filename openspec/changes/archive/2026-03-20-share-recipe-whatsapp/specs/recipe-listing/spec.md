## ADDED Requirements

### Requirement: Recipe card includes WhatsApp share action
Each recipe card SHALL include a WhatsApp share icon button overlaid on the card image. Clicking the share button SHALL NOT trigger the card's navigation to the detail page.

#### Scenario: Share icon on card
- **WHEN** a recipe card is rendered
- **THEN** a WhatsApp share icon button is displayed in the top-right corner of the card image, alongside the favorite button

#### Scenario: Share click does not navigate
- **WHEN** the user clicks the WhatsApp share icon on a recipe card
- **THEN** the card link navigation SHALL NOT be triggered (click event is intercepted)
