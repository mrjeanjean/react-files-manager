import React from 'react';

import FileList from "./FileList";
import FileViewer from "./FileViewer";
import FileActions from "./FileActions";
import {IFile} from "../interfaces";

import {StoreProvider} from "easy-peasy";
import {createFileManagerStore} from "../store/filemanager.store";
import FileManagerEventEmitter from "../FileManagerEvents";


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
    getEmitter?:((eventEmitter:FileManagerEventEmitter)=>void)
}

function FileManager({files, allowMultipleSelection = false, getEmitter}:FileManagerProps<IFile>) {

    const eventEmitter = new FileManagerEventEmitter();

    if(getEmitter){
        getEmitter(eventEmitter);
    }

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
