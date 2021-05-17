import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/index.scss';

import FileManager from "./components/FileManager";
import FileList from "./components/FileList";
import FileViewer from "./components/FileViewer";
import FileManagerBody from "./components/FileManagerBody";
import FileManagerFooter from "./components/FileManagerFooter";
import FileTree from './file-tree/FileTree';
import {FileActionHandler, FileManagerAction} from "./actions/actions.types";
import FileManagerHeader from "./components/FileManagerHeader";

export interface IFile {
    url: string,
    width?: number,
    path?: string
}

export {default as FileManager} from './components/FileManager';

const originalFiles: Array<IFile> = [
    {url: "https://picsum.photos/id/350/200/300", path: "/pictures/"},
    {url: "https://picsum.photos/id/351/250/300", path: "/pictures/"},
    {url: "https://picsum.photos/id/352/300/200", path: "/pictures/2021/"},
    {url: "https://picsum.photos/id/353/300/300", path: "/pictures/2021/may/"},
    {url: "https://picsum.photos/id/25/300/300", path: "/"},
    {url: "https://picsum.photos/id/160/300/300", path: "/"},
    {url: "https://picsum.photos/id/202/300/300", path: "/"},
    {url: "https://picsum.photos/id/87/300/300", path: "/"},
    {url: "https://picsum.photos/id/99/300/300", path: "/"},
    {url: "https://picsum.photos/id/56/300/150", path: "/"},
    {url: "https://picsum.photos/id/353/300/150", path: "/"},
    {url: "https://picsum.photos/id/353/300/150", path: "/"},
    {url: "https://picsum.photos/id/353/300/150", path: "/"},
    {url: "https://picsum.photos/id/353/300/150", path: "/"},
    {url: "https://picsum.photos/id/353/300/150", path: "/"},
    {url: "https://picsum.photos/id/230/300/150", path: "/pictures/2021/april/"},
    {url: "https://picsum.photos/id/353/300/150", path: "/"},
    {url: "https://picsum.photos/id/353/300/150", path: "/"},
    {url: "https://picsum.photos/id/353/300/150", path: "/"},
    {url: "https://picsum.photos/id/354/200/300", path: "/files/"}
]

const filesWithoutPath: Array<IFile> = [
    {url: "https://picsum.photos/id/350/200/300"},
    {url: "https://picsum.photos/id/351/250/300"},
    {url: "https://picsum.photos/id/352/300/200"},
    {url: "https://picsum.photos/id/353/300/300"},
    {url: "https://picsum.photos/id/25/300/300"},
    {url: "https://picsum.photos/id/160/300/300"},
    {url: "https://picsum.photos/id/202/300/300"},
    {url: "https://picsum.photos/id/87/300/300"},
    {url: "https://picsum.photos/id/99/300/300"},
    {url: "https://picsum.photos/id/56/300/150"},
    {url: "https://picsum.photos/id/353/300/150"},
    {url: "https://picsum.photos/id/100/300/150"},
    {url: "https://picsum.photos/id/353/300/150"},
    {url: "https://picsum.photos/id/200/300/150"},
    {url: "https://picsum.photos/id/353/300/150"},
    {url: "https://picsum.photos/id/230/300/150"},
    {url: "https://picsum.photos/id/353/300/150"},
    {url: "https://picsum.photos/id/360/300/150"},
    {url: "https://picsum.photos/id/111/300/150"},
    {url: "https://picsum.photos/id/378/200/300"},
    {url: "https://picsum.photos/id/600/200/300"}
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

const fileActionHandlers: Array<FileActionHandler<IFile>> = [
    {
        type: FileManagerAction.selectFiles,
        callback: (data) => {
            console.log("ON SELECTIONNE DES IMAGES !", data);
        }
    },
    {
        type: FileManagerAction.deleteFiles,
        callback: (data, store) => {
            store.actions.setLoading(true);
            console.log("ON REMOVE DES IMAGES !", data);

            setTimeout(()=>{
                store.actions.setLoading(false);
            }, 2000);
        }
    }
]

function Main() {
    return (
        <div>
            <FileManager<IFile>
                files={originalFiles}
                allowMultipleSelection={false}
                fileActionHandlers={fileActionHandlers}
            >
                <FileManagerHeader/>
                <FileManagerBody>
                    <FileTree fileTree={fileTree}/>
                    <FileList child={Image}/>
                    <FileViewer child={Image}/>
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
    document.getElementById('file-manager')
)
