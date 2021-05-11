import React from 'react';

import {StoreProvider} from "easy-peasy";
import {createFileManagerStore} from "../store/filemanager-store";
import {FileActionType} from "../actions/actions.types";

interface FileManagerProps<T>{
    files: Array<T>,
    allowMultipleSelection?: boolean,
    children: Array<JSX.Element>,
    fileActions?: Array<FileActionType<T>>
}

/**
 * Main entry of file manager. Must be used as a wrapper around all file manager.
 */
function FileManager<T>({files, allowMultipleSelection = false, children, fileActions}:FileManagerProps<T>) {

    const store = createFileManagerStore<T>(
        files,
        allowMultipleSelection,
        fileActions
    );

    return (
        <div className="file-manager">
            <StoreProvider store={store}>
                {children}
            </StoreProvider>
        </div>
    )
}

export default FileManager;
