import React from "react";

import {useSelectedFiles} from "./FileManagerContext";

interface FileViewerProps{
    child?: React.ElementType
}

function FileViewer(){
    const files = useSelectedFiles();

    return (
        <div className="file-viewer">
            {files.length} fichiers sélectionnés.
            {files.length > 0 && (
                <button>Tout supprimer</button>
            )}
        </div>
    )
}

export default FileViewer;


