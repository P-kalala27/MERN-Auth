/* eslint-disable no-unused-vars */
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

//appel de l'api du backend
const baseQuery = fetchBaseQuery({baseUrl:''});


export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({}),
})