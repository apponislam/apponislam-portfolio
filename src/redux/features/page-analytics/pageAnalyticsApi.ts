import { baseApi } from "../../api/baseApi";
import { TResponse } from "../contact/contactApi";

export interface TPageAnalytics {
    _id: string;
    path: string;
    views: number;
    uniqueVisitors?: number;
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
    createdAt: string;
    updatedAt: string;
}

export interface TrackPageViewRequest {
    path: string;
    referrer?: string;
}

export interface AnalyticsQueryParams {
    page?: number;
    limit?: number;
    path?: string;
    startDate?: string;
    endDate?: string;
}

export const pageAnalyticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Record page view (Public)
        trackPageView: builder.mutation<TResponse<TPageAnalytics>, TrackPageViewRequest>({
            query: (data) => ({
                url: "/page-analytics",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["PageAnalytics"],
        }),

        // Get page analytics stats / list (Admin)
        getAllAnalytics: builder.query<TResponse<TPageAnalytics[]>, AnalyticsQueryParams | void>({
            query: (params) => ({
                url: "/page-analytics",
                method: "GET",
                params: params || {},
            }),
            providesTags: ["PageAnalytics"],
        }),

        // Get page analytics summary (Admin)
        getAnalyticsSummary: builder.query<TResponse<any>, void>({
            query: () => ({
                url: "/page-analytics/summary",
                method: "GET",
            }),
            providesTags: ["PageAnalytics"],
        }),
    }),
});

export const {
    useTrackPageViewMutation,
    useGetAllAnalyticsQuery,
    useGetAnalyticsSummaryQuery,
} = pageAnalyticsApi;
