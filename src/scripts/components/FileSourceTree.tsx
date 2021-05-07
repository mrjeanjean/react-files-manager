import React, {useEffect, useState} from "react";
import {Actions, useStoreActions} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager-store";

interface ChildProps {
    path: string,
    name: string,
    children?: Array<ChildProps>
}

interface NodeProps {
    node: ChildProps,
    currentPath: string,
    onClick: (path: string) => void,
}

function Node({node, onClick, currentPath}: NodeProps) {

    const [open, setOpen] = useState<boolean>(false);

    const toggleOpen = () => {
        setOpen(!open);
    }

    const openNode = () => {
        setOpen(true);
    }

    return (
        <div className={"file-source-tree__node" + (open ? " is-open" : "") + ((currentPath === node.path) ? " is-selected" : "")}>
            <div className="file-source-tree__label">
                {node.children && (
                    <button
                        className="file-source-tree__arrow"
                        onClick={()=>toggleOpen()}
                    />
                )}
                <button
                    className="file-source-tree__button"
                    onClick={() => {
                        onClick(node.path);
                        openNode();
                    }}
                >{`${node.name}`}</button>
            </div>
            {node.children && (
                <ul hidden={!open}>
                    {node.children.map((child: ChildProps, index: number) => (
                        <Node key={index} node={child} onClick={onClick} currentPath={currentPath}/>
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
                currentPath={path}
            />
        </div>
    )
}
