import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './baseUrl';

const authToken = () => {
return localStorage.getItem('token')
}

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders: (headers) => {
        const token = authToken();
        
        if(token) {
        headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    }
    }),

    endpoints: (builder) => ({
        getAllReviews: builder.query({
            query: () => 'review',
        }),
        getReviewById: builder.query({
            query: (id) => `review/${id}`,
        }),
        postReview: builder.mutation({
            query: (newreview) => ({
                url: 'review',
                method: 'POST',
                body: newreview,
            }),
        }),
        updateReview: builder.mutation({
            query: ({ id, data }) => ({
                url: `review/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteReview: builder.mutation({
            query: (id) => ({
                url: `review/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetAllReviewsQuery, useGetReviewByIdQuery, usePostReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation } = reviewApi;