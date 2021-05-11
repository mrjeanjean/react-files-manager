import {
    action,
    Action,
    Computed,
    computed,
    createStore,
    State,
    Thunk,
    thunk,
} from "easy-peasy";
import {arrayHas, arrayRemove} from "../helpers";
import {FileActionPayload, FileActionType} from "../actions/actions.types";
import {createFileActionsManager} from "../actions/create-file-actions-manager";
import {createFileFiltersManager} from "../filters/create-file-filters-manager";
import {getDefaultFileFilters} from "../filters/default-file-filters";

export interface FileType {
    path ?: string
}

export interface FileManagerModel<T extends FileType> {
    files: Array<T>;
    selectedFiles: Array<T>;
    filteredFiles: Computed<FileManagerModel<T>, Array<T>>
    allowMultipleSelection: boolean;
    toggleSelectedFile: Action<FileManagerModel<T>, T>;
    applyFileActions: Thunk<FileManagerModel<T>, FileActionPayload>,
    fetchFiles: Action<FileManagerModel<T>, Array<T>>,
    currentPath: string,
    setCurrentPath: Action<FileManagerModel<T>, string>
}

export function createFileManagerStore<T extends FileType>(
    files: Array<T> = [],
    allowMultipleSelection: boolean,
    fileActions: Array<FileActionType<T>> = []
) {

    const {addAction, dispatchActionFromType} = createFileActionsManager<T>();
    fileActions.forEach(action=>addAction(action.type, action.callback));

    const {addFilter, applyFilters} = createFileFiltersManager<T>();
    getDefaultFileFilters<T>().forEach(filter=>addFilter(filter));

    files = files.map((file:T) =>{
        if(!file.path){
            file.path = "/";
        }
        return file;
    })

    const fileManagerModel: FileManagerModel<T> = {
        files: [...files],
        fetchFiles: action((state, files) => {
            const newState = {...state};
            newState.files = files;
            return newState;
        }),
        filteredFiles: computed(state => {
            let computedFiles = [...state.files];
            return applyFilters(computedFiles, state);
        }),
        allowMultipleSelection: allowMultipleSelection,
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
        }),
        applyFileActions: thunk((actions, payload: FileActionPayload, {getState}) => {
            dispatchActionFromType(payload.type, payload.payload, {
                actions: actions,
                state: getState()
            })
        }),
        currentPath: "/",
        setCurrentPath: action((state: State<FileManagerModel<T>>, path: string) => {
            const newState = {...state};
            newState.currentPath = path;
            return newState;
        }),
    };
    return createStore(fileManagerModel, {disableImmer: true});
}

