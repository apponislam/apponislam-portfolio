import { baseApi } from "../../api/baseApi";
import { TResponse } from "../contact/contactApi";

export interface TActivity {
    _id: string;
    userId?: string;
    action: string;
    details?: string;
    ipAddress?: string;
    userAgent?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ActivityQueryParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export const activityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all activity logs (Admin)
        getAllActivities: builder.query<TResponse<TActivity[]>, ActivityQueryParams | void>({
            query: (params) => ({
                url: "/activities",
                method: "GET",
                params: params || {},
            }),
            providesTags: ["Activity"],
        }),

        // Get single activity log details (Admin)
        getSingleActivity: builder.query<TResponse<TActivity>, string>({
            query: (id) => ({
                url: `/activities/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Activity", id }],
        }),

        // Clear or delete activity logs (Admin)
        deleteActivity: builder.mutation<TResponse<null>, string>({
            query: (id) => ({
                url: `/activities/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Activity"],
        }),
    }),
});

export const {
    useGetAllActivitiesQuery,
    useGetSingleActivityQuery,
    useDeleteActivityMutation,
} = activityApi;
