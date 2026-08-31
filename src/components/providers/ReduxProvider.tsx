"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "@/redux/store";
import AnalyticsTracker from "./AnalyticsTracker";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AnalyticsTracker>
                    {children}
                </AnalyticsTracker>
            </PersistGate>
        </Provider>
    );
}
