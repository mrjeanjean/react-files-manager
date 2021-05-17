import React from "react";

import {FileManagerModel} from "../store/filemanager-store";
import {Actions, State, useStoreActions, useStoreState} from "easy-peasy";
import {withPlural} from "../helpers";
import {FileManagerAction} from "../actions/actions.types";

interface FileViewerProps {
    child: React.ElementType
}

/**
 * Display current selected files
 */
function FileViewer<T>({child}: FileViewerProps) {
    const selectedFiles = useStoreState((state: State<FileManagerModel<T>>) => state.selectedFiles);
    const allowMultipleSelection = useStoreState((state: State<FileManagerModel<T>>) => state.allowMultipleSelection);
    const applyFileActions = useStoreActions((store: Actions<FileManagerModel<T>>) => store.applyFileActions);

    return (
        <div className={"file-viewer" + (selectedFiles.length > 1 ? " file-viewer--multiple-images-selected" : "")}>
            {selectedFiles.length > 0 && (
                <div className="file-viewer__items-wrapper">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="file-viewer__item"
                             style={{transform: `translateX(-${index * 3}rem)`}}>
                            {React.createElement(child, {file})}
                        </div>
                    ))}
                </div>
            )}
            {allowMultipleSelection && (
                <span>{selectedFiles.length} {
                    withPlural(selectedFiles, "file selected", "files selected")
                }</span>
            )}
            {selectedFiles.length > 0 && (
                <button
                    type="button"
                    onClick={() => applyFileActions({type: FileManagerAction.deleteFiles, payload: selectedFiles})}
                    className="button--action"
                >Delete</button>
            )}
        </div>
    )
}

export default FileViewer;


