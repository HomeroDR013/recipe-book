## Why

La aplicación actualmente muestra un listado de recetas en cards pero no permite ver los detalles completos de cada una. El usuario necesita poder hacer clic en una receta para ver toda su información (ingredientes, pasos, etc.) en una vista dedicada.

## What Changes

- Agregar React Router para navegación entre vistas (listado ↔ detalle)
- Crear endpoint RTK Query `getRecipeById` para obtener una receta individual
- Crear página de detalle que muestre: imagen grande, nombre, descripción, ingredientes, pasos numerados, categoría, dificultad y tiempo de preparación
- Hacer que las cards del listado sean clickeables y naveguen a `/recipes/:id`
- Incluir botón "Volver al listado" en la vista de detalle

## Capabilities

### New Capabilities
- `recipe-detail`: Vista de detalle de receta individual con navegación desde el listado y botón de regreso

### Modified Capabilities
- `recipe-listing`: Las cards deben ser clickeables y navegar a la ruta de detalle

## Impact

- **Dependencias**: Se agrega `react-router-dom` al proyecto
- **API**: Nuevo endpoint RTK Query `getRecipeById` usando `GET /recipes/:id`
- **Código afectado**: `App.tsx` (agregar router), `RecipeCard.tsx` (hacer clickeable), `recipesApi.ts` (nuevo endpoint)
- **Rutas**: `/` (listado), `/recipes/:id` (detalle)
