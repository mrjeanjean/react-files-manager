import React from "react";

import {arrayHas} from "../helpers";
import {Actions, State, useStoreActions, useStoreState} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager-store";

interface FileListProps {
    child: React.ElementType
    onFileSelected?: Function;
}

/**
 * Display list of files
 * @param {JSX.Element} child - must be passed to display the thumbnail
 */
function FileList<T>({child}: FileListProps) {

    const files = useStoreState((state: State<FileManagerModel<T>>) => state.filteredFiles);
    const selectedFiles = useStoreState((state: State<FileManagerModel<T>>) => state.selectedFiles);
    const toggleSelectedFile = useStoreActions((actions: Actions<FileManagerModel<T>>) => actions.toggleSelectedFile);

    return (
        <div className="file-list-wrapper">
            <div className="file-list">
                {files.map((file, index) => (
                    <div
                        className={"file-list__item " + (arrayHas<T>(selectedFiles, file) ? "selected" : "")}
                        key={index}
                        onClick={() => {
                            toggleSelectedFile(file)
                        }}
                    >
                        {React.createElement(child, {file})}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileList
