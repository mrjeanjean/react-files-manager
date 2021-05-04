import {action, Action, createStore, State} from "easy-peasy";
import {arrayHas, arrayRemove} from "../helpers";
import FileManagerEvents, {FileManagerEventsType} from "../FileManagerEvents";

export interface FileManagerModel<T> {
    files: Array<T>;
    selectedFiles: Array<T>;
    allowMultipleSelection: boolean;
    toggleSelectedFile: Action<FileManagerModel<T>, T>;
    dispatchEvent: Action<FileManagerModel<T>, FileManagerEventsType>;
    eventsEmitter: FileManagerEvents
}

export function createFileManagerStore<T>(initialFiles: Array<T> = [], events: FileManagerEvents, allowMultipleSelection: boolean) {
    const fileManagerModel: FileManagerModel<T> = {
        files: initialFiles,
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
        })
    };
    return createStore(fileManagerModel, {disableImmer: true});
}

