import React from "react";

import {IFile} from "../interfaces";
import {arrayHas} from "../helpers";
import {useStoreActions, useStoreState} from "../store/filemanager.hooks";
import {State} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager.store";

interface FileListProps {
    onFileSelected?: Function;
    child: React.ElementType
}

function FileList({child}: FileListProps) {

    const files = useStoreState((state: State<FileManagerModel<IFile>>) => state.files);
    const selectedFiles = useStoreState((state: State<FileManagerModel<IFile>>) => state.selectedFiles);
    const toggleSelectedFile = useStoreActions(actions => actions.toggleSelectedFile);

    return (
        <div className="file-list-wrapper">
            <div className="file-list">
                {files.map((file, index) => (
                    <div
                        className={"file-list__item " + (arrayHas<IFile>(selectedFiles, file) ? "selected" : "")}
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
