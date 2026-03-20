## Why

The recipe data in `db.json` has inconsistencies in unit formatting and capitalization of proper nouns. This makes the app look unpolished and inconsistent to users.

## What Changes

- **Unit spacing**: Metric units lack a space between the number and unit (e.g., "500ml" → "500 ml", "200g" → "200 g", "1kg" → "1 kg"). Standardize all metric measurements to include a space.
- **Proper noun capitalization**: Cheese names derived from proper nouns should be capitalized (e.g., "queso cheddar" → "queso Cheddar", "queso manchego" → "queso Manchego").

### In Scope

- Fixing metric unit spacing in ingredient lists (ml, g, kg)
- Capitalizing proper nouns in ingredient names

### Out of Scope

- Rewording descriptions or steps
- Adding missing ingredients or correcting recipe content
- Modifying recipe 11 (test data from create form)

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None — this is a data-only fix in `db.json` with no behavior changes.

## Impact

- **Modified files**: `src/db.json` — ingredient strings only
- **No code changes**: Purely data corrections
- **Requires mock server restart** to pick up changes
