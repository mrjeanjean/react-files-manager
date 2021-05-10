import {Actions, State} from "easy-peasy";
import {FileManagerModel} from "./filemanager-store";

export enum FileManagerActionsTypes{
    selectFiles,
    deleteFiles
}

export type FileActionPayload = {
    type: FileManagerActionsTypes,
    payload: any
}

export type FileAction<T> = {
    type: FileManagerActionsTypes,
    callback: (data:any, actions:Actions<FileManagerModel<T>>, state:State<FileManagerModel<T>>)=>void
}

export function FileActionsManager<T>(){
    const actions:Map<FileManagerActionsTypes, Array<Function>> = new Map<FileManagerActionsTypes, Array<Function>>();

    const addAction = (type:FileManagerActionsTypes, callback: Function)=>{
        if(!actions.has(type)){
            actions.set(type, []);
        }

        let currentActions = actions.get(type) ?? [];

        actions.set(type, [
            ...currentActions,
            callback
        ]);

        return actions;
    }

    const dispatchActionFromType = (
        type:FileManagerActionsTypes,
        payload:any,
        store:Actions<FileManagerModel<T>>,
        state:State<FileManagerModel<T>>
    ) => {
        let actionsFromType = actions.get(type) ?? [];
        actionsFromType.forEach(callback=>{
            callback(payload, store, state);
        })
    }

    return {
        addAction,
        dispatchActionFromType
    }
}
