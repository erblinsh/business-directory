import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseUrl } from "./baseUrl";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
    }),
})
