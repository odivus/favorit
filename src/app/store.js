import { configureStore } from '@reduxjs/toolkit';
import { favoritApi } from '../api/favoritApi';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [favoritApi.reducerPath]: favoritApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(favoritApi.middleware),
});
