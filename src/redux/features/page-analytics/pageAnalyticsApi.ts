import { baseApi } from "../../api/baseApi";
import { TResponse } from "../contact/contactApi";

export interface TPageAnalytics {
    _id: string;
    path: string;
    count?: number;
    views?: number;
    uniqueVisitors?: number;
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
    date?: string;
    createdAt: string;
    lastVisitedAt?: string;
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
                url: "/page-analytics/track",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["PageAnalytics"],
        }),

        // Get page analytics stats / list (Admin)
        getAllAnalytics: builder.query<TResponse<TPageAnalytics[]>, AnalyticsQueryParams | void>({
            query: (params) => ({
                url: "/page-analytics/logs",
                method: "GET",
                params: params || {},
            }),
            providesTags: ["PageAnalytics"],
        }),

        // Get page analytics summary (Admin)
        getAnalyticsSummary: builder.query<TResponse<any>, void>({
            query: () => ({
                url: "/page-analytics/stats",
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
