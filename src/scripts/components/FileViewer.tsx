import React from "react";

import {FileManagerModel} from "../store/filemanager-store";
import {Actions, State, useStoreActions, useStoreState} from "easy-peasy";
import {FileManagerEventsType} from "../filemanager-events";
import {withPlural} from "../helpers";
import {FileManagerActionsTypes} from "../store/file-manager-actions";

interface FileViewerProps {
    child?: React.ElementType
}

function FileViewer<T>() {
    const selectedFiles = useStoreState((state: State<FileManagerModel<T>>) => state.selectedFiles);
    const applyFileActions = useStoreActions((store:Actions<FileManagerModel<T>>)=>store.applyFileActions);

    return (
        <div className="file-viewer">
            <span>{selectedFiles.length} {withPlural(selectedFiles, "fichier sélectionné", "fichiers sélectionnés")}</span>
            {selectedFiles.length > 0 && (
                <button
                type="button"
                onClick={()=>applyFileActions({type: FileManagerActionsTypes.deleteFiles, payload: selectedFiles})}
                className="button--action"
                >Supprimer</button>
            )}
        </div>
    )
}

export default FileViewer;


