### Requirement: Fetch recipe by ID from the API
The system SHALL fetch a single recipe from `GET /recipes/:id` using an RTK Query endpoint when the recipe detail page mounts.

#### Scenario: Successful fetch
- **WHEN** the user navigates to `/recipes/:id`
- **THEN** the system fetches the recipe from `http://localhost:3001/recipes/:id` and displays its full details

#### Scenario: API error
- **WHEN** the API request to `/recipes/:id` fails
- **THEN** the system displays an error message indicating the recipe could not be loaded

#### Scenario: Loading state
- **WHEN** the API request is in progress
- **THEN** the system displays a loading indicator

#### Scenario: Recipe not found
- **WHEN** the API returns a 404 for the given ID
- **THEN** the system displays a message indicating the recipe was not found

### Requirement: Display full recipe information
The recipe detail page SHALL display the recipe image (large), name, description, ingredients list, numbered steps, category, difficulty badge, and preparation time.

#### Scenario: Complete recipe display
- **WHEN** the recipe data is loaded
- **THEN** the page displays a large hero image, the recipe name as heading, the full description, a bulleted list of ingredients, numbered preparation steps, and metadata (category, difficulty, prep time)

#### Scenario: Image fallback
- **WHEN** the recipe image fails to load
- **THEN** the page displays a placeholder instead of a broken image

### Requirement: Navigation back to listing
The recipe detail page SHALL include a button that navigates back to the recipe listing.

#### Scenario: Back button navigation
- **WHEN** the user clicks the "Volver al listado" button
- **THEN** the system navigates to the recipe listing page at `/`

### Requirement: WhatsApp share action in recipe detail
The recipe detail page SHALL include a WhatsApp share button alongside the existing recipe metadata (category, difficulty, prep time).

#### Scenario: Share button placement
- **WHEN** the recipe detail page displays a recipe
- **THEN** a WhatsApp share button is visible in the metadata/actions area of the page

#### Scenario: Share button not shown during loading
- **WHEN** the recipe data is still loading
- **THEN** the WhatsApp share button SHALL NOT be displayed

### Requirement: Route configuration for recipe detail
The application SHALL define a route at `/recipes/:id` that renders the recipe detail page.

#### Scenario: Direct URL access
- **WHEN** the user navigates directly to `/recipes/1`
- **THEN** the system renders the recipe detail page for recipe with ID 1

#### Scenario: Unknown route
- **WHEN** the user navigates to an undefined route
- **THEN** the system redirects to the recipe listing at `/`
