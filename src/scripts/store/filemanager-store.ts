import {
    action,
    Action,
    Actions,
    Computed,
    computed,
    createStore,
    State,
    Thunk,
    thunk,
} from "easy-peasy";
import {arrayHas, arrayRemove} from "../helpers";
import FileManagerEventEmitter, {FileManagerEventsType} from "../filemanager-events";
import {FileAction, FileActionPayload, FileActionsManager, FileManagerActionsTypes} from "./file-manager-actions";

export interface FileManagerModel<T> {
    files: Array<T>;
    selectedFiles: Array<T>;
    filteredFiles: Computed<FileManagerModel<T>, Array<T>>
    allowMultipleSelection: boolean;
    toggleSelectedFile: Action<FileManagerModel<T>, T>;
    eventsEmitter: FileManagerEventEmitter,
    filesMiddlewares: Array<Function>,
    addFilesMiddleware: Action<FileManagerModel<T>, Function>,
    removeFilesMiddleware: Action<FileManagerModel<T>, Function>,
    applyFileActions: Thunk<FileManagerModel<T>, FileActionPayload>,
    fetchFiles: Action<FileManagerModel<T>, Array<T>>
}

export function createFileManagerStore<T>(
    files: Array<T> = [],
    eventsEmitter: FileManagerEventEmitter,
    allowMultipleSelection: boolean,
    fileActions: Array<FileAction<T>> = []
) {

    const {addAction, dispatchActionFromType} = FileActionsManager<T>();
    fileActions.forEach(action=>addAction(action.type, action.callback));

    const fileManagerModel: FileManagerModel<T> = {
        files: [...files],
        fetchFiles: action((state, files) => {
            const newState = {...state};
            newState.files = files;
            return newState;
        }),
        filteredFiles: computed(state => {
            let computedFiles = [...state.files];

            state.filesMiddlewares.forEach(middleware => {
                computedFiles = middleware(computedFiles);
            })

            return computedFiles;
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
        eventsEmitter: eventsEmitter,
        filesMiddlewares: [] as Array<Function>,
        addFilesMiddleware: action((state: State<FileManagerModel<T>>, middleware: Function) => {
            const newState = {...state};
            newState.filesMiddlewares = [...newState.filesMiddlewares, middleware];
            return newState;
        }),
        removeFilesMiddleware: action((state: State<FileManagerModel<T>>, middleware: Function) => {
            const newState = {...state};
            if (arrayHas<Function>(state.filesMiddlewares, middleware)) {
                newState.filesMiddlewares = arrayRemove<Function>(newState.filesMiddlewares, middleware);
            }
            return newState;
        }),
        applyFileActions: thunk((actions, payload: FileActionPayload, {getState}) => {
            dispatchActionFromType(payload.type, payload.payload, actions, getState())
        }),
    };
    return createStore(fileManagerModel, {disableImmer: true});
}

