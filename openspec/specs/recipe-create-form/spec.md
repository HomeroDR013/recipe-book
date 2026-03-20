### Requirement: Recipe creation form displays all required fields
The system SHALL display a form in a centered modal dialog with the following fields: name (text), description (textarea), ingredients (dynamic list), steps (dynamic list), category (dropdown), difficulty (dropdown with Fácil/Media/Difícil), preparation time (number in minutes), and image URL (text).

#### Scenario: Form renders with all fields
- **WHEN** the user clicks the "Nueva receta" button on the listing page
- **THEN** a centered modal dialog opens displaying input fields for name, description, ingredients, steps, category, difficulty, prep time, and image URL

#### Scenario: Category dropdown loads options from API
- **WHEN** the form loads
- **THEN** the category dropdown SHALL be populated with categories fetched from `GET /categories`

#### Scenario: Difficulty dropdown shows fixed options
- **WHEN** the form loads
- **THEN** the difficulty dropdown SHALL display exactly three options: Fácil, Media, Difícil

### Requirement: Dynamic ingredient list management
The system SHALL allow users to add and remove ingredients from the recipe form. The form SHALL start with one empty ingredient field.

#### Scenario: Add ingredient
- **WHEN** the user clicks the "Agregar ingrediente" button
- **THEN** a new empty ingredient text field is appended to the list

#### Scenario: Remove ingredient
- **WHEN** the user clicks the remove button next to an ingredient
- **THEN** that ingredient field is removed from the list

#### Scenario: Minimum one ingredient required
- **WHEN** the user attempts to submit the form with zero ingredients
- **THEN** the system SHALL display a validation error indicating at least one ingredient is required

#### Scenario: Empty ingredient validation
- **WHEN** the user attempts to submit the form with an ingredient field that is empty
- **THEN** the system SHALL display a validation error on that field

### Requirement: Dynamic step list management with reordering
The system SHALL allow users to add, remove, and reorder preparation steps. The form SHALL start with one empty step field. Steps SHALL be numbered sequentially.

#### Scenario: Add step
- **WHEN** the user clicks the "Agregar paso" button
- **THEN** a new empty step text field is appended to the list

#### Scenario: Remove step
- **WHEN** the user clicks the remove button next to a step
- **THEN** that step is removed and remaining steps are renumbered

#### Scenario: Reorder step up
- **WHEN** the user clicks the "move up" button on a step that is not the first step
- **THEN** that step swaps position with the step above it

#### Scenario: Reorder step down
- **WHEN** the user clicks the "move down" button on a step that is not the last step
- **THEN** that step swaps position with the step below it

#### Scenario: Minimum one step required
- **WHEN** the user attempts to submit the form with zero steps
- **THEN** the system SHALL display a validation error indicating at least one step is required

### Requirement: Form field validation
The system SHALL validate all required fields before submission and display clear error messages in Spanish next to each invalid field.

#### Scenario: Required field validation
- **WHEN** the user submits the form with any required field empty
- **THEN** the system SHALL display an error message next to each empty required field

#### Scenario: Name minimum length
- **WHEN** the user enters a name shorter than 3 characters
- **THEN** the system SHALL display an error: "El nombre debe tener al menos 3 caracteres"

#### Scenario: Preparation time must be positive
- **WHEN** the user enters a prep time of 0 or negative
- **THEN** the system SHALL display an error: "El tiempo debe ser mayor a 0 minutos"

#### Scenario: Valid image URL format
- **WHEN** the user enters an image URL that is not a valid URL
- **THEN** the system SHALL display an error: "Ingresa una URL válida"

#### Scenario: Image URL is optional
- **WHEN** the user leaves the image URL field empty and submits
- **THEN** the system SHALL NOT display a validation error for the image URL field

### Requirement: Recipe submission via API
The system SHALL submit the recipe data to `POST /recipes` using an RTK Query mutation. On success, the system SHALL close the dialog, reset the form, and navigate to the newly created recipe's detail page.

#### Scenario: Successful submission
- **WHEN** the user fills all required fields correctly and clicks "Guardar receta"
- **THEN** the system sends a POST request to `/recipes` with the form data, closes the dialog, and navigates to `/recipes/:id` where `:id` is the new recipe's ID

#### Scenario: Submission error
- **WHEN** the POST request to `/recipes` fails
- **THEN** the system SHALL display an error message indicating the recipe could not be saved

#### Scenario: Prevent double submission
- **WHEN** the user clicks "Guardar receta" while a submission is in progress
- **THEN** the submit button SHALL be disabled until the request completes

### Requirement: Dialog dismissal
The system SHALL allow users to close the creation dialog without saving. The form SHALL reset when dismissed.

#### Scenario: Close via cancel button
- **WHEN** the user clicks the "Cancelar" button or the close (✕) button in the dialog
- **THEN** the dialog closes, the form resets, and no data is submitted

#### Scenario: Close via Escape key
- **WHEN** the user presses Escape while the dialog is open
- **THEN** the dialog closes and the form resets
