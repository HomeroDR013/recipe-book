## 1. Detail Page

- [x] 1.1 Add a WhatsApp share button to `RecipeDetailPage.tsx` in the metadata area, using a `<button>` element with `aria-label="Compartir por WhatsApp"`, visible text, and WhatsApp SVG icon
- [x] 1.2 Implement the share handler: construct the message with recipe name, category, and `window.location.href`, URL-encode with `encodeURIComponent`, and open `https://wa.me/?text=...` via `window.open` with `noopener,noreferrer`

## 2. Recipe Cards

- [x] 2.1 Add a WhatsApp share icon button to `RecipeCard.tsx` in the image overlay area, alongside the favorite button, with `aria-label="Compartir por WhatsApp"` and `preventDefault`/`stopPropagation` to avoid card navigation
- [x] 2.2 Implement the card share handler: construct the URL using `window.location.origin + /recipes/:id` and the same message format and security patterns as the detail page

## 3. Verification

- [x] 3.1 Visual verification: click the share button on a recipe detail page and on a recipe card, confirm WhatsApp opens with the correct pre-filled message in both cases
- [x] 3.2 Verify special characters: test with a recipe that has accented characters and confirm the message renders correctly
