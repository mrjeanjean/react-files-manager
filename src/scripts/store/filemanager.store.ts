import {action, Action, createStore} from "easy-peasy";
import {arrayHas, arrayRemove} from "../helpers";

export interface FileManagerModel<T> {
    files: Array<T>;
    selectedFiles: Array<T>;
    allowMultipleSelection: boolean;
    toggleSelectedFile: Action<FileManagerModel<T>, T>;
}

export function createFileManagerStore<T>(initialFiles: Array<T> = []) {
    const fileManagerModel: FileManagerModel<T> = {
        files: initialFiles,
        allowMultipleSelection: true,
        selectedFiles: [] as Array<T>,
        toggleSelectedFile: action((state, file) => {
            const newState = {...state};

            if (newState.allowMultipleSelection) {
                if (arrayHas<T>(state.selectedFiles, file)) {
                    newState.selectedFiles = arrayRemove<T>(newState.selectedFiles, file);
                } else {
                    newState.selectedFiles = [...newState.selectedFiles, file];
                }
            } else {
                newState.selectedFiles = [];
                if (!arrayHas<T>(state.selectedFiles, file)) {
                    newState.selectedFiles = [...newState.selectedFiles, file];
                }
            }

            return newState;
        })
    };
    return createStore(fileManagerModel, {disableImmer: true});
}

