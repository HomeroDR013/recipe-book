## 1. Setup y dependencias

- [x] 1.1 Instalar `react-router-dom` como dependencia del proyecto

## 2. API y data fetching

- [x] 2.1 Agregar endpoint `getRecipeById` en `recipesApi.ts` que haga `GET /recipes/:id` y exportar el hook `useGetRecipeByIdQuery`

## 3. Componente de detalle

- [x] 3.1 Crear `RecipeDetailPage.tsx` en `features/recipes/components/` que lea el param `:id` de la ruta y use `useGetRecipeByIdQuery`
- [x] 3.2 Implementar estados de carga, error y receta no encontrada
- [x] 3.3 Mostrar imagen grande, nombre, descripción, lista de ingredientes, pasos numerados, categoría, dificultad y tiempo de preparación
- [x] 3.4 Agregar botón "Volver al listado" que navegue a `/`
- [x] 3.5 Implementar fallback de imagen cuando falla la carga

## 4. Routing

- [x] 4.1 Configurar `BrowserRouter` y rutas en `App.tsx`: `/` para listado, `/recipes/:id` para detalle, y redirect a `/` para rutas desconocidas

## 5. Navegación desde el listado

- [x] 5.1 Modificar `RecipeCard.tsx` para envolver la card con `<Link to={/recipes/${id}}>` manteniendo el estilo visual actual
