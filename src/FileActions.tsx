import React from "react";
import './FileActions.css';
import {useFiles, useSelectedFiles} from "./FileManagerContext";

interface FileActionsProps{
    onFilesRemoved: Function
}

function FileActions({onFilesRemoved}:FileActionsProps){
    const selectedFiles = useSelectedFiles();

    const dispatchSelectedFiles = ()=>{
        onFilesRemoved(selectedFiles);
    }

    return (
        <div className="file-manager__actions">
            <button type="button" onClick={dispatchSelectedFiles}>Selectionner</button>
        </div>
    )
}

export default FileActions;
