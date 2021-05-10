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
import {Actions, State} from "easy-peasy";
import {FileManagerModel} from "./store/filemanager-store";
import {FileActionPayload, FileManagerActionsTypes} from "./store/file-manager-actions";

const originalFiles: Array<IFile> = [
    {url: "https://picsum.photos/id/350/200/300", width: 250, path: "/pictures/"},
    {url: "https://picsum.photos/id/351/250/300", width: 250, path: "/pictures/"},
    {url: "https://picsum.photos/id/352/300/200", width: 250, path: "/pictures/2021/"},
    {url: "https://picsum.photos/id/353/300/300", width: 250, path: "/pictures/2021/may/"},
    {url: "https://picsum.photos/id/353/300/300", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/300", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/300", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/300", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/300", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/150", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/150", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/150", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/150", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/150", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/150", width: 250, path: "/"},
    {url: "https://picsum.photos/id/230/300/150", width: 250, path: "/pictures/2021/april/"},
    {url: "https://picsum.photos/id/353/300/150", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/150", width: 250, path: "/"},
    {url: "https://picsum.photos/id/353/300/150", width: 250, path: "/"},
    {url: "https://picsum.photos/id/354/200/300", width: 250, path: "/files/"}
]

const tree = {
    path: "/",
    name: "My files",
    children: [
        {
            path: "/files/",
            name: "Files"
        },
        {
            path: "/pictures/",
            name: "Pictures",
            children: [
                {
                    path: "/pictures/2020/",
                    name: "2020"
                },
                {
                    path: "/pictures/2021/",
                    name: "2021",
                    children: [
                        {
                            path: "/pictures/2021/april/",
                            name: "April"
                        },
                        {
                            path: "/pictures/2021/may/",
                            name: "May"
                        }
                    ]
                }
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

const fileActions = [
    {
        type: FileManagerActionsTypes.selectFiles,
        callback: (data:FileActionPayload, actions:Actions<FileManagerModel<IFile>>, state:State<FileManagerModel<IFile>>)=>{
            console.log("ON SELECTIONNE DES IMAGES !", data)
            actions.fetchFiles([
                {url: "https://picsum.photos/id/5/600/150", width: 250, path: "/"},
                ...state.files
            ])
        }
    },
    {
        type: FileManagerActionsTypes.deleteFiles,
        callback: (data:FileActionPayload, actions:Actions<FileManagerModel<IFile>>, state:State<FileManagerModel<IFile>>)=>{
            console.log("ON REMOVE DES IMAGES !", data)
            actions.fetchFiles(
                state.files.filter((file, index)=>index>0)
            );
        }
    }
]

function Main() {
    return (
        <div>
            <FileManager<IFile>
                files={originalFiles}
                allowMultipleSelection={false}
                fileActions={fileActions}
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
