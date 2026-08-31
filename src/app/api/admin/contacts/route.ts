import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/models/contact";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const search = searchParams.get("search") || "";
        const status = searchParams.get("status") || "";

        const skip = (page - 1) * limit;

        await connectToDatabase();

        // Build query filter
        const query: any = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { message: { $regex: search, $options: "i" } },
            ];
        }
        if (status) {
            query.status = status;
        }

        // Fetch contacts with pagination & total count
        const [contacts, total] = await Promise.all([
            Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            Contact.countDocuments(query),
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            success: true,
            data: contacts,
            pagination: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error: any) {
        console.error("Error fetching contacts:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to fetch contacts" },
            { status: 500 }
        );
    }
}
