"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface PaginationProps {
    pagination: PaginationMeta;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    pagination,
    onPageChange,
}) => {
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;
    const totalItems = pagination.total;
    const hasPrevPage = pagination.hasPrevPage;
    const hasNextPage = pagination.hasNextPage;
    // Helper to generate page numbers array with ellipsis (e.g. 1 ... 10 11 ... 100)
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between border-t pt-4 border-border/60 gap-3">
            {/* Left side info */}
            <p className="text-xs text-muted-foreground">
                Showing page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
                <span className="font-semibold text-foreground">{totalPages || 1}</span> ({totalItems} total messages)
            </p>

            {/* Right side page controls: < 1 ... 10,11 ... 100 > */}
            <div className="flex items-center gap-1">
                {/* Previous Button */}
                <Button
                    variant="outline"
                    size="sm"
                    disabled={!hasPrevPage}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="h-8 w-8 p-0"
                    title="Previous Page"
                >
                    <Icons.chevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Number Buttons */}
                {getPageNumbers().map((p, idx) => {
                    if (typeof p === "string") {
                        return (
                            <span key={`ellipsis-${idx}`} className="px-1.5 text-xs text-muted-foreground">
                                ...
                            </span>
                        );
                    }
                    return (
                        <Button
                            key={`page-${p}`}
                            variant={p === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(p)}
                            className="h-8 w-8 p-0 text-xs font-medium"
                        >
                            {p}
                        </Button>
                    );
                })}

                {/* Next Button */}
                <Button
                    variant="outline"
                    size="sm"
                    disabled={!hasNextPage}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="h-8 w-8 p-0"
                    title="Next Page"
                >
                    <Icons.chevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
