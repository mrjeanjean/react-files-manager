import React, {useEffect, useState} from "react";
import {Actions, useStoreActions} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager-store";

interface ChildProps {
    path: string,
    children?: Array<ChildProps>
}

interface NodeProps {
    node: ChildProps,
    onClick: (path: string) => void,
    path?: string
}

function Node({node, onClick, path = ""}: NodeProps) {

    const [open, setOpen] = useState<boolean>(true);

    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <div>
            <button onClick={e => {
                onClick(path + node.path);
                toggleOpen()
            }}>{`${node.path}`}</button>
            {node.children && (
                <ul hidden={!open}>
                    {node.children.map((child: ChildProps, index: number) => (
                        <Node key={index} node={child} onClick={onClick} path={`${path}${node.path}`}/>
                    ))}
                </ul>
            )}
        </div>
    )
}

interface FileSourceTreeProps {
    tree: ChildProps
}

export default function FileSourceTree<T extends { path: string }>({tree}: FileSourceTreeProps) {
    const addFilesMiddleware = useStoreActions((store: Actions<FileManagerModel<T>>) => store.addFilesMiddleware);
    const removeFilesMiddleware = useStoreActions((store: Actions<FileManagerModel<T>>) => store.removeFilesMiddleware);

    const [path, setPath] = useState<string>("/");

    useEffect(() => {
        const middleware = (files: Array<T>) => {
            return files.filter((file: T, index: number) => file.path === path);
        };
        addFilesMiddleware(middleware);


        return () => {
            removeFilesMiddleware(middleware);
        }
    }, [path])

    return (
        <div className="file-source-tree">
            <Node
                node={tree}
                onClick={
                    (path: string) => {
                        setPath(path)
                    }
                }
            />
        </div>
    )
}
