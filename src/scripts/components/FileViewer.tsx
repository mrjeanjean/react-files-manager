import React from "react";

import {useStoreActions, useStoreState} from "../store/filemanager.hooks";
import {FileManagerModel} from "../store/filemanager.store";
import {State} from "easy-peasy";
import {IFile} from "../interfaces";
import {FileManagerEventsType} from "../FileManagerEvents";

interface FileViewerProps{
    child?: React.ElementType
}

function FileViewer(){
    const files = useStoreState((state: State<FileManagerModel<IFile>>)=>state.selectedFiles);
    const dispatchEvent = useStoreActions((store)=>store.dispatchEvent)

    return (
        <div className="file-viewer">
            {files.length} fichiers sélectionnés.
            {files.length > 0 && (
                <button onClick={()=>dispatchEvent(FileManagerEventsType.delete)}>Tout supprimer</button>
            )}
        </div>
    )
}

export default FileViewer;


