import React from "react";

import {arrayHas} from "../helpers";
import {Actions, State, useStoreActions, useStoreState} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager-store";

interface FileListProps {
    onFileSelected?: Function;
    child: React.ElementType
}

function FileList<T>({child}: FileListProps) {

    const files = useStoreState((state: State<FileManagerModel<T>>) => state.files);
    const selectedFiles = useStoreState((state: State<FileManagerModel<T>>) => state.selectedFiles);
    const toggleSelectedFile = useStoreActions((actions: Actions<FileManagerModel<T>>) => actions.toggleSelectedFile);

    return (
        <div className="file-list-wrapper">
            Total de fichiers : {files.length}
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
