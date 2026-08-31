import { baseApi } from "../../api/baseApi";

export interface IReply {
    _id?: string;
    replyMessage: string;
    sentAt: string;
    resendId?: string;
}

export interface TContact {
    _id: string;
    name: string;
    email: string;
    message: string;
    social?: string;
    ipAddress?: string;
    userAgent?: string;
    status: "unread" | "read" | "replied" | "archived";
    resendAdminId?: string;
    resendAutoReplyId?: string;
    adminNotes?: string;
    replies: IReply[];
    repliedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface SendContactRequest {
    name: string;
    email: string;
    message: string;
    social?: string;
}

export interface ReplyContactRequest {
    id: string;
    replyMessage: string;
}

export interface UpdateContactStatusRequest {
    id: string;
    status: "unread" | "read" | "replied" | "archived";
}

export interface ContactQueryParams {
    page?: number;
    limit?: number;
    status?: string;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export interface TResponse<T = any> {
    statusCode: number;
    success: boolean;
    message?: string;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: T;
}

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Send a contact message (Public)
        sendContactMessage: builder.mutation<TResponse<TContact>, SendContactRequest>({
            query: (data) => ({
                url: "/contacts",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Contact"],
        }),

        // Get all contact messages (Admin)
        getAllContacts: builder.query<TResponse<TContact[]>, ContactQueryParams | void>({
            query: (params) => ({
                url: "/contacts",
                method: "GET",
                params: params || {},
            }),
            providesTags: ["Contact"],
        }),

        // Get single contact message details by ID (Admin)
        getSingleContact: builder.query<TResponse<TContact>, string>({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Contact", id }],
        }),

        // Reply to a contact message (Admin)
        replyToContact: builder.mutation<TResponse<TContact>, ReplyContactRequest>({
            query: ({ id, replyMessage }) => ({
                url: `/contacts/${id}/reply`,
                method: "POST",
                body: { replyMessage },
            }),
            invalidatesTags: (result, error, { id }) => ["Contact", { type: "Contact", id }],
        }),

        // Update contact status (Admin)
        updateContactStatus: builder.mutation<TResponse<TContact>, UpdateContactStatusRequest>({
            query: ({ id, status }) => ({
                url: `/contacts/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => ["Contact", { type: "Contact", id }],
        }),

        // Delete a contact message (Admin)
        deleteContact: builder.mutation<TResponse<null>, string>({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Contact"],
        }),
    }),
});

export const {
    useSendContactMessageMutation,
    useGetAllContactsQuery,
    useGetSingleContactQuery,
    useReplyToContactMutation,
    useUpdateContactStatusMutation,
    useDeleteContactMutation,
} = contactApi;
