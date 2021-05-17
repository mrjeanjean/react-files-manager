import {FileManagerAction, FileManagerStoreData} from "./actions.types";

/**
 * File manager actions handler
 * used to dispatch store actions through all listeners
 */
export function createFileActionsManager<T>() {
    const fileActionHandlers: Map<string, Array<Function>> = new Map<string, Array<Function>>();

    const addActionHandler = (type: string | FileManagerAction, callback: Function) => {
        if (!fileActionHandlers.has(type)) {
            fileActionHandlers.set(type, []);
        }

        let currentActions = fileActionHandlers.get(type) ?? [];

        fileActionHandlers.set(type, [
            ...currentActions,
            callback
        ]);

        return fileActionHandlers;
    }

    const dispatchActionFromType = (
        type: string | FileManagerAction,
        payload: any,
        storeData: FileManagerStoreData<T>
    ) => {
        let actionsFromType = fileActionHandlers.get(type) ?? [];
        actionsFromType.forEach(callback => {
            callback(payload, storeData);
        })
    }

    return {
        addActionHandler,
        dispatchActionFromType
    }
}
