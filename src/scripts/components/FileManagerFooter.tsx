import React from "react";

export default function FileManagerFooter({children}:{children:Array<JSX.Element>|JSX.Element}){
    return (
        <div className="file-manager__footer">
            {children}
        </div>
    )
}
