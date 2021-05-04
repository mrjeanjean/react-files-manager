import React from 'react';

import FileList from "./FileList";
import FileViewer from "./FileViewer";
import FileActions from "./FileActions";
import {IFile} from "../interfaces";

import {StoreProvider} from "easy-peasy";
import {createFileManagerStore} from "../store/filemanager.store";

const files: Array<IFile> = [
    {url: "https://picsum.photos/id/350/200/300", width: 250},
    {url: "https://picsum.photos/id/351/250/300", width: 250},
    {url: "https://picsum.photos/id/352/300/200", width: 250},
    {url: "https://picsum.photos/id/353/300/300", width: 250},
    {url: "https://picsum.photos/id/353/300/300", width: 250},
    {url: "https://picsum.photos/id/353/300/300", width: 250},
    {url: "https://picsum.photos/id/353/300/300", width: 250},
    {url: "https://picsum.photos/id/353/300/300", width: 250},
    {url: "https://picsum.photos/id/353/300/300", width: 250},
    {url: "https://picsum.photos/id/353/300/150", width: 250},
    {url: "https://picsum.photos/id/353/300/150", width: 250},
    {url: "https://picsum.photos/id/353/300/150", width: 250},
    {url: "https://picsum.photos/id/353/300/150", width: 250},
    {url: "https://picsum.photos/id/353/300/150", width: 250},
    {url: "https://picsum.photos/id/353/300/150", width: 250},
    {url: "https://picsum.photos/id/353/300/150", width: 250},
    {url: "https://picsum.photos/id/353/300/150", width: 250},
    {url: "https://picsum.photos/id/353/300/150", width: 250},
    {url: "https://picsum.photos/id/353/300/150", width: 250},
    {url: "https://picsum.photos/id/354/200/300", width: 250}
]


function Image({file}: { file?: IFile }) {
    return (
        <>
            {file && (
                <img src={file.url} alt=""/>
            )}
        </>
    )
}

function FileManager() {

    const store = createFileManagerStore<IFile>(files);

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
