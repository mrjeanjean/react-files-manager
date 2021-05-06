import React from "react";

import {FileManagerModel} from "../store/filemanager-store";
import {Actions, State, useStoreActions, useStoreState} from "easy-peasy";
import {FileManagerEventsType} from "../filemanager-events";
import {withPlural} from "../helpers";

interface FileViewerProps {
    child?: React.ElementType
}

function FileViewer<T>() {
    const files = useStoreState((state: State<FileManagerModel<T>>) => state.selectedFiles);
    const dispatchEvent = useStoreActions((store:Actions<FileManagerModel<T>>) => store.dispatchEvent)

    return (
        <div className="file-viewer">
            <span>{files.length} {withPlural(files, "fichier sélectionné", "fichiers sélectionnés")}</span>
            {files.length > 0 && (
                <button onClick={() => dispatchEvent(FileManagerEventsType.delete)}>Tout supprimer</button>
            )}
        </div>
    )
}

export default FileViewer;


