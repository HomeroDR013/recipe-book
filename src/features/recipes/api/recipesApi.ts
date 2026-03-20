import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, Favorite, Recipe } from "../types";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Favorite", "Recipe"],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
      providesTags: [{ type: "Recipe", id: "LIST" }],
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),
    addRecipe: builder.mutation<Recipe, Omit<Recipe, "id">>({
      query: (recipe) => ({
        url: "/recipes",
        method: "POST",
        body: recipe,
      }),
      invalidatesTags: [{ type: "Recipe", id: "LIST" }],
    }),
    getFavorites: builder.query<Favorite[], void>({
      query: () => "/favorites",
      providesTags: [{ type: "Favorite", id: "LIST" }],
    }),
    addFavorite: builder.mutation<Favorite, number>({
      query: (recipeId) => ({
        url: "/favorites",
        method: "POST",
        body: { recipeId },
      }),
      async onQueryStarted(recipeId, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          recipesApi.util.updateQueryData("getFavorites", undefined, (draft) => {
            draft.push({ id: Date.now(), recipeId });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [{ type: "Favorite", id: "LIST" }],
    }),
    removeFavorite: builder.mutation<void, number>({
      query: (id) => ({
        url: `/favorites/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          recipesApi.util.updateQueryData("getFavorites", undefined, (draft) => {
            const index = draft.findIndex((f) => f.id === id);
            if (index !== -1) draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [{ type: "Favorite", id: "LIST" }],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useAddRecipeMutation,
  useGetRecipeByIdQuery,
  useGetCategoriesQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = recipesApi;
