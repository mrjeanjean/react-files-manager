import React, {useEffect, useState} from "react";
import {Actions, useStoreActions} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager-store";
import {FileTreeNodeType} from "./file-tree.types";
import {FileTreeNode} from "./FileTreeNode";

interface FileTreeProps {
    fileTree: FileTreeNodeType
}

/**
 * Main entry of file tree structure
 */
export default function FileTree<T extends { path: string }>({fileTree}: FileTreeProps) {
    const addFilesMiddleware = useStoreActions((store: Actions<FileManagerModel<T>>) => store.addFilesMiddleware);
    const removeFilesMiddleware = useStoreActions((store: Actions<FileManagerModel<T>>) => store.removeFilesMiddleware);

    const [path, setPath] = useState<string>("/");

    useEffect(() => {
        const middleware = (files: Array<T>) => {
            return files.filter((file: T) => file.path === path);
        };
        addFilesMiddleware(middleware);


        return () => {
            removeFilesMiddleware(middleware);
        }
    }, [path])

    return (
        <div className="file-source-tree">
            <FileTreeNode
                node={fileTree}
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
