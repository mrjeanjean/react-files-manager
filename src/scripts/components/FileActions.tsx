import React from "react";

interface FileActionsProps{
    onFilesSelection: Function
}

function FileActions(){
    return (
        <div className="file-manager__actions">
            <button type="button">Selectionner</button>
        </div>
    )
}

export default FileActions;
