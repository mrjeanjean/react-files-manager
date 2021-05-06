import React from 'react';

import FileList from "./FileList";
import FileViewer from "./FileViewer";
import FileActions from "./FileActions";
import {IFile} from "../interfaces";

import {StoreProvider} from "easy-peasy";
import {createFileManagerStore} from "../store/filemanager-store";
import FileManagerEventsEmitter from "../filemanager-events";

interface FileManagerProps<T>{
    files: Array<T>,
    allowMultipleSelection?: boolean,
    getEmitter?:((eventEmitter:FileManagerEventsEmitter)=>void),
    children: Array<JSX.Element>
}

function FileManager<T>({files, allowMultipleSelection = false, getEmitter, children}:FileManagerProps<T>) {

    const eventEmitter = new FileManagerEventsEmitter();

    if(getEmitter){
        getEmitter(eventEmitter);
    }

    const store = createFileManagerStore<T>(
        files,
        eventEmitter,
        allowMultipleSelection
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
