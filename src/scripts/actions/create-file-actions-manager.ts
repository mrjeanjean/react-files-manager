import {FileManagerAction, FileManagerStoreData} from "./actions.types";

/**
 * File manager actions handler
 * used to dispatch store actions through all listeners
 */
export function createFileActionsManager<T>() {
    const fileActions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

    const addAction = (type: string | FileManagerAction, callback: Function) => {
        if (!fileActions.has(type)) {
            fileActions.set(type, []);
        }

        let currentActions = fileActions.get(type) ?? [];

        fileActions.set(type, [
            ...currentActions,
            callback
        ]);

        return fileActions;
    }

    const dispatchActionFromType = (
        type: string | FileManagerAction,
        payload: any,
        storeData: FileManagerStoreData<T>
    ) => {
        let actionsFromType = fileActions.get(type) ?? [];
        actionsFromType.forEach(callback => {
            callback(payload, storeData);
        })
    }

    return {
        addAction,
        dispatchActionFromType
    }
}
