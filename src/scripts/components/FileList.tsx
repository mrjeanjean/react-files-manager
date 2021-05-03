import React from "react";

import {useEvents, useFiles} from "./FileManagerContext";
import {IFile} from "../interfaces";
import {FileManagerEventsType} from "../FileManagerEvents";
import {useStateWithCallback} from "../helpers";

interface FileListProps {
    onFileSelected?: Function;
    allowMultipleSelection?: boolean,
    child: React.ElementType
}

function FileList({allowMultipleSelection = true, child}: FileListProps) {
    const files = useFiles();
    const events = useEvents();

    const [selectedFiles, setSelectedFiles] = useStateWithCallback<Set<IFile>>(new Set(), (selection: any) => {
        events?.fire(FileManagerEventsType.select, {
            filesSelected: [...selection]
        })
    });

    const toggleSelectedFile = (file: IFile) => {
        const tempSet = new Set<IFile>([
                ...selectedFiles
            ]
        );

        if (allowMultipleSelection) {
            if (tempSet.has(file)) {
                tempSet.delete(file);
            } else {
                tempSet.add(file);
            }
        } else {
            if (tempSet.has(file)) {
                tempSet.clear();
            } else {
                tempSet.clear();
                tempSet.add(file);
            }
        }

        setSelectedFiles(tempSet);

        /**/
    }

    return (
        <div className="file-list-wrapper">
            <div className="file-list">
                {files.map((file, index) => (
                    <div
                        className={"file-list__item " + (selectedFiles.has(file) ? "selected" : "")}
                        key={index}
                        onClick={() => toggleSelectedFile(file)}
                    >
                        {React.createElement(child, {file})}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileList
