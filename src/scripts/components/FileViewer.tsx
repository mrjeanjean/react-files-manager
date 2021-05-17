import React from "react";

import {FileManagerModel} from "../store/filemanager-store";
import {Actions, State, useStoreActions, useStoreState} from "easy-peasy";
import {withPlural} from "../helpers";
import {FileManagerAction} from "../actions/actions.types";

/**
 * Display current selected files
 */
function FileViewer<T>() {
    const selectedFiles = useStoreState((state: State<FileManagerModel<T>>) => state.selectedFiles);
    const applyFileActions = useStoreActions((store: Actions<FileManagerModel<T>>) => store.applyFileActions);

    return (
        <div className="file-viewer">
            <span>{selectedFiles.length} {
                withPlural(selectedFiles, "fichier sélectionné", "fichiers sélectionnés")
            }</span>
            {selectedFiles.length > 0 && (
                <button
                    type="button"
                    onClick={() => applyFileActions({type: FileManagerAction.deleteFiles, payload: selectedFiles})}
                    className="button--action"
                >Supprimer</button>
            )}
        </div>
    )
}

export default FileViewer;


