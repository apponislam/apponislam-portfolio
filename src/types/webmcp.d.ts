import "react";

export interface WebMCPToolProperty {
    type: string;
    description?: string;
    enum?: string[];
}

export interface WebMCPToolInputSchema {
    type: "object";
    properties?: Record<string, WebMCPToolProperty>;
    required?: string[];
}

export interface WebMCPTool {
    name: string;
    description: string;
    inputSchema: WebMCPToolInputSchema;
    execute: (params: any) => Promise<any> | any;
}

export interface ModelContext {
    registerTool: (tool: WebMCPTool, options?: { signal?: AbortSignal }) => void;
    unregisterTool?: (name: string) => void;
}

declare global {
    interface Navigator {
        modelContext?: ModelContext;
    }
    interface Document {
        modelContext?: ModelContext;
    }
}

declare module "react" {
    interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
        toolname?: string;
        tooldescription?: string;
        toolautosubmit?: string | boolean;
    }
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        toolparamdescription?: string;
    }
    interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
        toolparamdescription?: string;
    }
}
