import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/index.scss';

import FileManager from "./components/FileManager";
import {IFile} from "./interfaces";
import FileManagerEventEmitter, {FileManagerEventsType} from "./filemanager-events";
import FileList from "./components/FileList";
import FileViewer from "./components/FileViewer";
import FileActions from "./components/FileActions";
import FileManagerBody from "./components/FileManagerBody";
import FileManagerFooter from "./components/FileManagerFooter";
import FileSourceTree from "./components/FileSourceTree";

const files: Array<IFile> = [
    {url: "https://picsum.photos/id/350/200/300", width: 250, path: "/pictures/"},
    {url: "https://picsum.photos/id/351/250/300", width: 250, path: "/files/"},
    {url: "https://picsum.photos/id/352/300/200", width: 250, path: "/files/2021/"},
    {url: "https://picsum.photos/id/353/300/300", width: 250, path: "/files/2021/may/"},
    {url: "https://picsum.photos/id/353/300/300", width: 250, path: "/"},
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
    {url: "https://picsum.photos/id/354/200/300", width: 250, path: "/photos/"}
]

const tree = {
    path: "/",
    children: [
        {path: "pictures/"},
        {
            path: "files/", children: [
                {path: "2020/"},
                {path: "2021/",
                    children: [
                        {path: "april/"},
                        {path: "may/"}
                    ]}
            ]
        },

    ]
}


function Image({file}: { file?: IFile }) {
    return (
        <>
            {file && (
                <img src={file.url} alt=""/>
            )}
        </>
    )
}

function Main() {
    const getEmitter = (eventEmitter: FileManagerEventEmitter) => {
        eventEmitter.add(FileManagerEventsType.select, (data: any) => {
            console.log("ON VA SELECTIONNER : ", data);
        });

        eventEmitter.add(FileManagerEventsType.delete, (data: any) => {
            console.log("ON VA SUPPRIMER : ", data);
        });
    }

    return (
        <div>
            <FileManager<IFile>
                files={files}
                allowMultipleSelection={true}
                getEmitter={getEmitter}
            >
                <FileManagerBody>
                    <FileSourceTree tree={tree}/>
                    <FileList child={Image}/>
                    <FileViewer/>
                </FileManagerBody>

                <FileManagerFooter>
                    <FileActions/>
                </FileManagerFooter>

            </FileManager>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Main/>
    </React.StrictMode>,
    document.getElementById('root')
)
