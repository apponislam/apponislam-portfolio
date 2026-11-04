"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "@/redux/store";
import AnalyticsTracker from "./AnalyticsTracker";
import { IconContext } from "react-icons";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <IconContext.Provider value={{ attr: { "aria-hidden": "true", role: "presentation", focusable: "false" } }}>
                    <AnalyticsTracker>{children}</AnalyticsTracker>
                </IconContext.Provider>
            </PersistGate>
        </Provider>
    );
}
