import React from "react";
import "./FileViewer.css";

import {useSelectedFiles} from "./FileManagerContext";

interface FileViewerProps{
    child: React.ElementType
}

function FileViewer({child}: FileViewerProps){
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


