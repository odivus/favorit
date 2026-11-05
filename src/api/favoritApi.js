import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { normalizeBrands, normalizeOffers } from './normalize';

const rawBaseQuery = fetchBaseQuery({ baseUrl: '/api', timeout: 15000 });

/**
 * Сервис отвечает HTTP 200 даже при бизнес-ошибке: { "error": "Empty key!" }.
 * Приводим такие ответы к стандартной ошибке RTK Query, чтобы UI обрабатывал
 * сетевые сбои и ошибки API одинаково.
 */
const baseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error) return result;

  const { data } = result;
  if (data?.error) {
    return { error: { status: 'API_ERROR', data: data.error } };
  }
  if (!Array.isArray(data?.goods)) {
    return { error: { status: 'PARSING_ERROR', data: 'Unexpected response shape' } };
  }
  return result;
};

export const favoritApi = createApi({
  reducerPath: 'favoritApi',
  baseQuery,
  endpoints: (build) => ({
    // Этап 1: все детали с этим номером -> список производителей
    getBrands: build.query({
      query: (number) => ({ url: '/price', params: { number } }),
      transformResponse: (response) => normalizeBrands(response.goods),
    }),
    // Этап 2: конкретная деталь + её аналоги, с признаком невозвратных позиций
    getOffers: build.query({
      query: ({ number, brand }) => ({
        url: '/price',
        params: { number, brand, analogues: 'on', info: 'on' },
      }),
      transformResponse: (response) => normalizeOffers(response.goods),
    }),
  }),
});

export const { useGetBrandsQuery, useGetOffersQuery } = favoritApi;
