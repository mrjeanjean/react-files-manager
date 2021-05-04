import React from 'react';

import FileList from "./FileList";
import FileViewer from "./FileViewer";
import FileActions from "./FileActions";
import {IFile} from "../interfaces";

import {StoreProvider} from "easy-peasy";
import {createFileManagerStore} from "../store/filemanager.store";
import FileManagerEvents from "../FileManagerEvents";


function Image({file}: { file?: IFile }) {
    return (
        <>
            {file && (
                <img src={file.url} alt=""/>
            )}
        </>
    )
}

interface FileManagerProps<T>{
    files: Array<T>,
    allowMultipleSelection?: boolean,
    eventEmitter?:FileManagerEvents
}

function FileManager({files, allowMultipleSelection = false, eventEmitter = new FileManagerEvents()}:FileManagerProps<IFile>) {

    const store = createFileManagerStore<IFile>(
        files,
        eventEmitter,
        allowMultipleSelection
    );

    return (
        <div className="file-manager">
            <StoreProvider store={store}>
                <div className="file-manager__body">
                    <FileList child={Image}/>
                    <FileViewer/>
                </div>
                <div className="file-manager__footer">
                    <FileActions/>
                </div>
            </StoreProvider>
        </div>
    )
}

export default FileManager;
