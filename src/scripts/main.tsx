import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/index.scss';

import FileManager from "./components/FileManager";
import FileList from "./components/FileList";
import FileViewer from "./components/FileViewer";
import FileManagerBody from "./components/FileManagerBody";
import FileManagerFooter from "./components/FileManagerFooter";
import FileTree from './file-tree/FileTree';
import {FileActionType, FileManagerAction} from "./actions/actions.types";

export interface IFile {
    url: string,
    width?: number,
    path?: string
}

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

const fileTree = {
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

const fileActions:Array<FileActionType<IFile>> = [
    {
        type: FileManagerAction.selectFiles,
        callback: (data)=>{
            console.log("ON SELECTIONNE DES IMAGES !", data)
        }
    },
    {
        type: FileManagerAction.deleteFiles,
        callback: (data, {actions, state})=>{
            console.log("ON REMOVE DES IMAGES ALEATOIREMENT !", data)
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
                    <FileTree fileTree={fileTree}/>
                    <FileList child={Image}/>
                    <FileViewer/>
                </FileManagerBody>

                <FileManagerFooter/>
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
