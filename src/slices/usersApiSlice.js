import { apiSlice } from "./apiSlice";

const USERS_URL = '/api';


export const usersApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login:builder.mutation({
            query:(data) => ({
                url: `${USERS_URL}/agentRoute/auth`, 
                method:'POST', 
                body:data,
            })
        }),
        logout:builder.mutation({
            query:() => ({
                url: `${USERS_URL}/agentRoute/logout`, 
                method:'POST', 
            })
        })
    })
})

export const {useLoginMutation, useLogoutMutation}  = usersApiSlice;