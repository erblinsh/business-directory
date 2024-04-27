import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from './baseUrl'

const authToken = () => {
  return localStorage.getItem('token')
}

export const businessApi = createApi({
  reducerPath: 'businessApi',
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
    getAllBusiness: builder.query({
      query: (filter= {}) => {
        return {
          url: "business",
          params: filter
        }
      }
    }),

    getBusinessById: builder.query({
      query: (id) => `business/${id}`,
    }),

    postBusiness: builder.mutation({
      query: (newBusiness) => ({
        url: 'business',
        method: 'POST',
        body: newBusiness,
      }),
    }),

    updateBusiness: builder.mutation({
      query: ({ id, updatedBusiness }) => ({
        url: `business/${id}`,
        method: 'PUT', 
        body: updatedBusiness,
      }),
    }),

    deleteBusiness: builder.mutation({
      query: (id) => ({
        url: `business/${id}`,
        method: 'DELETE',
      })
    })
  }),
})

export const { useGetAllBusinessQuery, useGetBusinessByIdQuery, usePostBusinessMutation, useUpdateBusinessMutation, useDeleteBusinessMutation } = businessApi