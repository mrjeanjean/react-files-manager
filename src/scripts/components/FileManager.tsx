import React from 'react';

import FileList from "./FileList";
import FileViewer from "./FileViewer";
import {IFile} from "../interfaces";
import FileManagerProvider from "../FileManagerContext";
import FileActions from "./FileActions";


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

    const onFilesRemoved = ((files:Array<IFile>)=>{
        console.log("ON VEUT SUPPRIMER DES FICHIERS: ", files);
    })

    return (
        <div className="file-manager">
            <FileManagerProvider files={files}>
                <div className="file-manager__body">
                    <FileList
                        child={Image}
                    />
                    <FileViewer
                        child={Image}
                    />
                </div>
                <div className="file-manager__footer">
                    <FileActions onFilesRemoved={onFilesRemoved}/>
                </div>
            </FileManagerProvider>
        </div>
    )
}

export default FileManager;
