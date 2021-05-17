import React from "react";
import {Actions, State, useStoreActions, useStoreState} from "easy-peasy";
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

    const currentPath = useStoreState((state: State<FileManagerModel<T>>) => state.currentPath);
    const setCurrentPath = useStoreActions((store: Actions<FileManagerModel<T>>) => store.setCurrentPath);

    return (
        <div className="file-source-tree">
            <FileTreeNode
                node={fileTree}
                onClick={
                    (path: string) => {
                        setCurrentPath(path)
                    }
                }
                currentPath={currentPath}
            />
        </div>
    )
}
