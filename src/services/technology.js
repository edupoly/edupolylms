// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const technologyApi = createApi({
  reducerPath: 'technologyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7777/' }),
  endpoints: (builder) => ({
    getAlltechnologies: builder.query({
      query: () => `/technologies`,
    }),
    gettechnology: builder.query({
      query: (tid) => `/gettechnology/${tid}`,
    }),
    addtechnology: builder.mutation({
        query:(technology)=>{
            return{
                url:"/addtechnology",
                method:"POST",
                body:technology
            }
        }
    }),
    updatetechnology: builder.mutation({
        query:({tid,updtech})=>{
            return{
                url:`/updatetechnology/${tid}`,
                method:"PUT",
                body:updtech
            }
        }
    }),
    deletetechnology: builder.mutation({
        query:(tid)=>{
            return{
                url:`/deletetechnology/${tid}`,
                method:"DELETE",
            }
        }
    }),
    addconcept: builder.mutation({
        query:({concept,id})=>{
            return{
                url:`/addconcept/${id}`,
                method:"PUT",
                body:concept
            }
        }
    }),
    updateconcept: builder.mutation({
        query:({concept,tid,cid})=>{
            return{
                url:`/updateconceptname/${tid}/${cid}`,
                method:"PUT",
                body:concept
            }
        }
    }),
    deleteconcept: builder.mutation({
        query:({tid,cid})=>{
            return{
                url:`/deleteconcept/${tid}/${cid}`,
                method:"DELETE"
            }
        }
    }),
    addtopic: builder.mutation({
        query:({topicInfo,tid,cid})=>{
            return{
                url:`/addtopic/${tid}/${cid}`,
                method:"PUT",
                body:topicInfo
            }
        }
    }),
    topicdetails: builder.query({
        query: ({tid,cid}) => `/topicdetails/${tid}/${cid}`
    }),
    gettopicdetails: builder.query({
        query: ({tid,cid,toid}) => `/gettopicdetails/${tid}/${cid}/${toid}`
    }),
    updatetopic: builder.mutation({
        query:({topicInfo,tid,cid,toid})=>{
            console.log("hiiii",tid,cid,toid)
            return{
                url:`/updatetopic/${tid}/${cid}/${toid}`,
                method:"PUT",
                body:topicInfo
            }
        }
    }),
    deletetopic: builder.mutation({
        query:({tid,cid,toid})=>{
            return{
                url:`/deletetopic/${tid}/${cid}/${toid}`,
                method:"DELETE",
            }
        }
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddtechnologyMutation,
               useGetAlltechnologiesQuery,
               useGettechnologyQuery,
               useUpdatetechnologyMutation,
               useAddconceptMutation,
               useLazyGettechnologyQuery,
               useDeletetechnologyMutation,
               useUpdateconceptMutation,
               useDeleteconceptMutation,
               useAddtopicMutation,
               useTopicdetailsQuery,
               useGettopicdetailsQuery,
               useUpdatetopicMutation,
               useDeletetopicMutation,
               } = technologyApi