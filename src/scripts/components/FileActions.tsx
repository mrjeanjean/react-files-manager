import React, {useEffect} from "react";
import {FileManagerEventsType} from "../filemanager-events";
import {Actions, State, useStoreActions, useStoreState} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager-store";
import {FileManagerActionsTypes} from "../store/file-manager-actions";

function FileActions<T>(){

    const dispatchEvent = useStoreActions((store:Actions<FileManagerModel<T>>)=>store.dispatchEvent);
    const applyFileActions = useStoreActions((store:Actions<FileManagerModel<T>>)=>store.applyFileActions);
    const selectedFiles = useStoreState((state: State<FileManagerModel<T>>) => state.selectedFiles);

    return (
        <div className="file-manager__actions">
            <button
                type="button"
                onClick={()=>applyFileActions({type: FileManagerActionsTypes.selectFiles, payload: selectedFiles})}
                className="button--action file-actions__button"
            >Selectionner</button>
        </div>
    )
}

export default FileActions;
