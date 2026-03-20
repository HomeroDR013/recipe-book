## Context

The recipe detail page (`RecipeDetailPage.tsx`) displays full recipe information. There is currently no sharing functionality. The app targets a Spanish-speaking audience where WhatsApp is the primary messaging platform.

## Goals / Non-Goals

**Goals:**
- Allow users to share a recipe via WhatsApp with one click
- Include recipe name, category, and a direct link to the recipe in the shared message

**Non-Goals:**
- Multi-platform sharing (Twitter, Facebook, etc.)
- Web Share API integration
- Share tracking or analytics
- Custom share preview (Open Graph meta tags)

## Decisions

### 1. WhatsApp URL scheme via `wa.me`

**Decision:** Use `https://wa.me/?text=...` to trigger WhatsApp sharing.

**Rationale:** This is the official WhatsApp URL scheme. It works on both mobile (opens WhatsApp app) and desktop (opens WhatsApp Web). No SDK or API key required. The `text` parameter accepts URL-encoded text.

**Alternative considered:** `whatsapp://send?text=...` — rejected because it's less reliable across platforms and doesn't gracefully degrade (no fallback if WhatsApp isn't installed, whereas `wa.me` opens a web page).

### 2. Inline implementation in both RecipeDetailPage and RecipeCard

**Decision:** Add the share button inline in both `RecipeDetailPage.tsx` (text + icon in metadata area) and `RecipeCard.tsx` (icon-only overlay on card image), without creating a separate component.

**Rationale:** The share logic is a simple `window.open()` call. The two placements have slightly different UI (full button vs icon-only) and URL construction (`window.location.href` vs `window.location.origin + path`). Extracting a shared component would add indirection for minimal code savings. If more share targets are added later, a `ShareButton` component can be extracted then.

### 3. Share message format

**Decision:** Format the message as a short, readable text: recipe name, category label, and the page URL on separate lines.

**Rationale:** WhatsApp renders plain text with line breaks. A concise message encourages sharing without overwhelming the recipient. The URL allows the recipient to open the recipe directly.

### 4. URL construction strategy

**Decision:** Use `window.location.href` on the detail page and `window.location.origin + /recipes/:id` on recipe cards.

**Rationale:** On the detail page, `window.location.href` already points to `/recipes/:id`. On the listing page, the URL is `/`, so the card must construct the recipe URL explicitly using `window.location.origin` to get the correct base domain.

### Architecture Decisions

**Modified files:**

| File | Action | Purpose |
|------|--------|---------|
| `src/features/recipes/components/RecipeDetailPage.tsx` | **Modify** | Add WhatsApp share button in the metadata section |
| `src/features/recipes/components/RecipeCard.tsx` | **Modify** | Add WhatsApp share icon overlay alongside the favorite button |

**No new files or dependencies.**

## Risks / Trade-offs

- **[WhatsApp not installed]** → On desktop, `wa.me` opens WhatsApp Web in a new tab. On mobile without WhatsApp, the browser shows the wa.me landing page with install prompts. Acceptable degradation.
- **[localhost URLs in share message]** → During development, the shared URL will be `http://localhost:5173/recipes/:id`, which is useless to the recipient. Mitigation: this is a dev-only concern; in production the URL would be the real domain.
