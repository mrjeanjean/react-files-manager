import {action, Action, Computed, computed, createStore, State} from "easy-peasy";
import {arrayHas, arrayRemove} from "../helpers";
import FileManagerEventEmitter, {FileManagerEventsType} from "../filemanager-events";



export interface FileManagerModel<T> {
    files: Computed<FileManagerModel<T>, Array<T>>;
    selectedFiles: Array<T>;
    allowMultipleSelection: boolean;
    toggleSelectedFile: Action<FileManagerModel<T>, T>;
    dispatchEvent: Action<FileManagerModel<T>, FileManagerEventsType>;
    eventsEmitter: FileManagerEventEmitter,
    filesMiddlewares: Array<Function>,
    addFilesMiddleware: Action<FileManagerModel<T>, Function>,
    removeFilesMiddleware: Action<FileManagerModel<T>, Function>
}

export function createFileManagerStore<T>(files: Array<T> = [], events: FileManagerEventEmitter, allowMultipleSelection: boolean) {

    const fileManagerModel: FileManagerModel<T> = {
        files: computed(state => {
            let computedFiles = [...files];

            state.filesMiddlewares.forEach(middleware=>{
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
        eventsEmitter: events,
        dispatchEvent: action((state: State<FileManagerModel<T>>, eventType: FileManagerEventsType) => {
            if(eventType === FileManagerEventsType.select){
                state.eventsEmitter.fire(FileManagerEventsType.select, state.selectedFiles);
            }

            if(eventType === FileManagerEventsType.delete){
                state.eventsEmitter.fire(FileManagerEventsType.delete, state.selectedFiles);
            }
            return state;
        }),
        filesMiddlewares: [] as Array<Function>,
        addFilesMiddleware: action((state: State<FileManagerModel<T>>, middleware: Function)=>{
            const newState = {...state};
            newState.filesMiddlewares = [...newState.filesMiddlewares, middleware];
            return newState;
        }),
        removeFilesMiddleware: action((state: State<FileManagerModel<T>>, middleware: Function)=>{
            const newState = {...state};
            if(arrayHas<Function>(state.filesMiddlewares, middleware)){
                newState.filesMiddlewares = arrayRemove<Function>(newState.filesMiddlewares, middleware);
            }
            return newState;
        })
    };
    return createStore(fileManagerModel, {disableImmer: true});
}

