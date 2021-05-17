import React from "react";

export default function FileManagerBody({children}: { children: Array<JSX.Element> | JSX.Element }) {
    return (
        <div className="file-manager__body">
            {children}
        </div>
    )
}
