## ADDED Requirements

### Requirement: Share recipe via WhatsApp from detail page
The recipe detail page SHALL include a "Compartir por WhatsApp" button that opens WhatsApp with a pre-formatted message containing the recipe name, category, and a link to the recipe detail page.

#### Scenario: Share button click on detail page
- **WHEN** the user clicks the "Compartir por WhatsApp" button on a recipe detail page
- **THEN** the system opens a new tab/window to `https://wa.me/?text=...` with a URL-encoded message containing the recipe name, category, and the current page URL

#### Scenario: Share message format
- **WHEN** the WhatsApp share is triggered for a recipe named "Tacos al Pastor" with category "Plato Fuerte"
- **THEN** the message SHALL include the recipe name, the category, and the full URL to the recipe detail page, each on a separate line

#### Scenario: Special characters in recipe name
- **WHEN** the recipe name contains special characters (e.g., accented characters like "Fácil" or symbols)
- **THEN** the share message SHALL correctly encode all characters in the URL using `encodeURIComponent`

#### Scenario: Button visibility on detail page
- **WHEN** the recipe detail page is fully loaded with recipe data
- **THEN** the WhatsApp share button SHALL be visible in the recipe metadata area

### Requirement: Share recipe via WhatsApp from recipe card
Each recipe card in the listing page SHALL include a WhatsApp share icon button that opens WhatsApp with a pre-formatted message. The button SHALL NOT trigger card navigation.

#### Scenario: Share icon click on card
- **WHEN** the user clicks the WhatsApp share icon on a recipe card
- **THEN** the system opens WhatsApp with a message containing the recipe name, category, and a URL to `/recipes/:id`, and the card link navigation SHALL NOT be triggered

#### Scenario: Share icon placement on card
- **WHEN** a recipe card is rendered
- **THEN** a WhatsApp share icon button is visible in the top-right corner of the card image, alongside the favorite button

#### Scenario: Share URL construction from card
- **WHEN** the WhatsApp share is triggered from a recipe card
- **THEN** the share URL SHALL be constructed using `window.location.origin` + `/recipes/:id` since the card is not on the detail page
