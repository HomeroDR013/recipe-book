## Context

La aplicación Recipe Book tiene un listado de recetas con búsqueda y filtros, pero no existe navegación entre vistas. Actualmente `App.tsx` renderiza directamente `<RecipeList />` sin router. El modelo `Recipe` ya incluye todos los campos necesarios (ingredients, steps, etc.) pero la API solo expone `GET /recipes` y `GET /categories`. JSON Server soporta `GET /recipes/:id` automáticamente.

## Goals / Non-Goals

**Goals:**
- Permitir navegación del listado al detalle y viceversa sin perder el estado de filtros
- Mostrar toda la información de la receta en una vista dedicada
- Mantener la arquitectura existente (feature-based, RTK Query)

**Non-Goals:**
- Edición o creación de recetas (futuro cambio)
- Rutas anidadas o layouts compartidos complejos
- Persistencia del estado de filtros en URL (se puede agregar después)

## Decisions

### 1. React Router v6 con `BrowserRouter`
**Decisión**: Usar `react-router-dom` v6 con rutas declarativas en `App.tsx`.
**Alternativas**: TanStack Router (más features pero overkill para 2 rutas), hash router (no necesario con Vite dev server).
**Rationale**: Es el estándar del ecosistema React, liviano para las 2 rutas que necesitamos (`/` y `/recipes/:id`).

### 2. RTK Query `getRecipeById` endpoint
**Decisión**: Agregar un endpoint `getRecipeById` en `recipesApi.ts` que haga `GET /recipes/:id`.
**Alternativas**: Reutilizar la cache de `getRecipes` y filtrar client-side.
**Rationale**: El endpoint dedicado es más simple, aprovecha la cache de RTK Query por ID, y escala mejor cuando haya más recetas.

### 3. Componente `RecipeDetail` en `features/recipes/components/`
**Decisión**: Crear `RecipeDetailPage.tsx` como componente de página dentro de la feature `recipes`.
**Rationale**: Sigue la estructura feature-based existente. El componente lee el `id` de los params de la ruta y usa el hook de RTK Query.

### 4. Navegación con `<Link>` en RecipeCard
**Decisión**: Envolver la card con `<Link to={/recipes/${id}}>` en lugar de `onClick` + `useNavigate`.
**Rationale**: Semántica HTML correcta (accesibilidad, abrir en nueva pestaña), sin cambios en la estructura visual de la card.

## Risks / Trade-offs

- **[Pérdida de estado de filtros al volver]** → Al navegar atrás se pierde el estado de búsqueda/filtro. Mitigación: aceptable para MVP, se puede resolver con query params en URL o estado global en un cambio futuro.
- **[Nueva dependencia]** → `react-router-dom` agrega ~15KB gzipped. Mitigación: es una dependencia estándar y necesaria para cualquier app multi-página.
