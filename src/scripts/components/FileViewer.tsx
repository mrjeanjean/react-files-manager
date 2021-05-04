import React from "react";

import {useStoreState} from "../store/filemanager.hooks";
import {FileManagerModel} from "../store/filemanager.store";
import {State} from "easy-peasy";
import {IFile} from "../interfaces";

interface FileViewerProps{
    child?: React.ElementType
}

function FileViewer(){
    const files = useStoreState((state: State<FileManagerModel<IFile>>)=>state.selectedFiles);

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


