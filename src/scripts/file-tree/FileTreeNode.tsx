import React, {useState} from "react";
import {FileTreeNodeType} from "./file-tree.types";

interface FileTreeNodeProps {
    node: FileTreeNodeType,
    currentPath: string,
    onClick: (path: string) => void,
}

/**
 * Represents a file tree node
 */
export function FileTreeNode({node, onClick, currentPath}: FileTreeNodeProps) {

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
                    {node.children.map((child: FileTreeNodeType, index: number) => (
                        <FileTreeNode key={index} node={child} onClick={onClick} currentPath={currentPath}/>
                    ))}
                </ul>
            )}
        </div>
    )
}
