import {Actions, State} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager-store";

export enum FileManagerAction {
    selectFiles = "SELECT_FILES",
    deleteFiles = "DELETE_FILES"
}

export type FileActionPayload = {
    type: string,
    payload: any
}

export type FileManagerStoreData<T> = {
    actions: Actions<FileManagerModel<T>>,
    state: State<FileManagerModel<T>>
}

export type FileActionType<T> = {
    type: string,
    callback: (data: any, store: FileManagerStoreData<T>) => void
}
