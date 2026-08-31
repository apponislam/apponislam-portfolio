import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/models/contact";

export const dynamic = "force-dynamic";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Contact ID is required" },
                { status: 400 }
            );
        }

        await connectToDatabase();
        const contact = await Contact.findById(id).lean();

        if (!contact) {
            return NextResponse.json(
                { success: false, error: "Contact not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: contact,
        });
    } catch (error: any) {
        console.error("Error fetching single contact:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to fetch contact" },
            { status: 500 }
        );
    }
}
