import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { businessApi } from './redux/api/businessApi';
import { categoryApi } from './redux/api/categoryApi';
import { reviewApi } from './redux/api/reviewApi';
import { authApi } from './redux/api/authApi';
import userAuthSlice from './redux/slices/userAuthSlice';
import darkModeSlice from './redux/slices/darkModeSlice';
import activeCategorySlice from './redux/slices/activeCategorySlice';
import paginationSlice from './redux/slices/paginationSlice';

export const store = configureStore({
    reducer: {
        darkTheme: darkModeSlice,
        activeCategory: activeCategorySlice,
        paginationSlice: paginationSlice,
        userAuthSlice: userAuthSlice,

        [businessApi.reducerPath]: businessApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        businessApi.middleware,
        categoryApi.middleware,
        reviewApi.middleware,
        authApi.middleware,
      ),
})


setupListeners(store.dispatch);