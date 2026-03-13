import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, Recipe } from "../types";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeByIdQuery, useGetCategoriesQuery } = recipesApi;
