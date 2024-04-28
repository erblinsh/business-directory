import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './baseUrl';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => 'category',
        }),
        getCategoryById: builder.query({
            query: (id) => `category/${id}`,
        }),
        postCategory: builder.mutation({
            query: (newCategory) => ({
                url: 'category',
                method: 'POST',
                body: newCategory,
            }),
        }),
        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `category/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `category/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery, usePostCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi;