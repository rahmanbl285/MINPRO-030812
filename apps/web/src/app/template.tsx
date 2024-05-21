import { Header } from "@/components/Header";
import React from "react";

export default function Template({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div>
            <Header/>
            {children}
        </div>
    )
}