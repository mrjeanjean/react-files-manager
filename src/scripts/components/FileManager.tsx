import React from 'react';

import {Actions, StoreProvider} from "easy-peasy";
import {createFileManagerStore, FileManagerModel} from "../store/filemanager-store";
import FileManagerEventsEmitter from "../filemanager-events";
import {FileAction} from "../store/file-manager-actions";

interface FileManagerProps<T>{
    files: Array<T>,
    allowMultipleSelection?: boolean,
    getEventsEmitter?:((eventEmitter:FileManagerEventsEmitter)=>void),
    children: Array<JSX.Element>,
    fileActions?: Array<FileAction<T>>
}

function FileManager<T>({files, allowMultipleSelection = false, getEventsEmitter, children, fileActions}:FileManagerProps<T>) {

    const fileManagerEventsEmitter = new FileManagerEventsEmitter();

    if(getEventsEmitter){
        getEventsEmitter(fileManagerEventsEmitter);
    }

    const store = createFileManagerStore<T>(
        files,
        fileManagerEventsEmitter,
        allowMultipleSelection,
        fileActions
    );

    return (
        <div className="file-manager">
            <StoreProvider store={store}>
                {children}
            </StoreProvider>
        </div>
    )
}

export default FileManager;
