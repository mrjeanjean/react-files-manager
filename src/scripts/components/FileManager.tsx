import React from 'react';

import {StoreProvider} from "easy-peasy";
import {createFileManagerStore} from "../store/filemanager-store";
import {FileActionHandler} from "../actions/actions.types";
import FileManagerLoader from "./FileManagerLoader";

interface FileManagerProps<T> {
    files: Array<T>,
    allowMultipleSelection?: boolean,
    children: Array<JSX.Element>,
    fileActionHandlers?: Array<FileActionHandler<T>>
}

/**
 * Main entry of file manager. Must be used as a wrapper around all file manager.
 */
function FileManager<T>({files, allowMultipleSelection = false, children, fileActionHandlers}: FileManagerProps<T>) {

    const store = createFileManagerStore<T>(
        files,
        allowMultipleSelection,
        fileActionHandlers
    );

    return (
        <div className="file-manager">
            <StoreProvider store={store}>
                {children}
                <FileManagerLoader/>
            </StoreProvider>
        </div>
    )
}

export default FileManager;
