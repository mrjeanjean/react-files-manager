import React from "react";
import {Actions, State, useStoreActions, useStoreState} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager-store";
import {FileManagerAction} from "../actions/actions.types";

export default function FileManagerFooter<T>() {
    const applyFileActions = useStoreActions((store: Actions<FileManagerModel<T>>) => store.applyFileActions);
    const selectedFiles = useStoreState((state: State<FileManagerModel<T>>) => state.selectedFiles);

    return (
        <div className="file-manager__footer">
            <div className="file-manager__actions">
                <button
                    type="button"
                    onClick={() => applyFileActions({type: FileManagerAction.selectFiles, payload: selectedFiles})}
                    className="button--action file-actions__button"
                >
                    Select
                </button>
            </div>
        </div>
    )
}
