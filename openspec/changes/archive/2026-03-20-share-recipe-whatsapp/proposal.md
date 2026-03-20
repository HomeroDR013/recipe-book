## Why

Users currently have no way to share recipes from the app. Adding a WhatsApp share button on the recipe detail page enables organic sharing — the most common way recipe apps grow their user base. WhatsApp is the dominant messaging platform in Latin America, aligning with the app's Spanish-language audience.

## What Changes

- Add a "Compartir por WhatsApp" button on the recipe detail page and on each recipe card in the listing
- On click, open `https://wa.me/?text=...` with a pre-formatted message containing the recipe name, category, and a link back to the recipe detail page
- No backend changes required — sharing uses the WhatsApp Web/app URL scheme

### In Scope

- WhatsApp share button on recipe detail page (in metadata area)
- WhatsApp share button on recipe cards (icon overlay on card image)
- Pre-formatted share message with recipe name, category, and URL

### Out of Scope

- Sharing to other platforms (Twitter, Facebook, etc.)
- Copy-to-clipboard functionality
- Share count tracking
- Native Web Share API integration

## Capabilities

### New Capabilities

- `recipe-share-whatsapp`: WhatsApp share buttons on recipe detail page and recipe cards that open WhatsApp with a pre-formatted message including recipe name, category, and detail page URL

### Modified Capabilities

- `recipe-detail`: Adding a WhatsApp share button to the recipe detail page layout
- `recipe-listing`: Adding a WhatsApp share icon to each recipe card

## Impact

- **Modified files**: `src/features/recipes/components/RecipeDetailPage.tsx` — add share button; `src/features/recipes/components/RecipeCard.tsx` — add share icon overlay
- **No new dependencies**: Uses standard `window.open()` with WhatsApp URL scheme
- **No API changes**: Purely client-side feature
