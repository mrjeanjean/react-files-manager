import React from "react";
import {FileManagerEventsType} from "../FileManagerEvents";
import {Actions, useStoreActions} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager.store";

function FileActions<T>(){

    const dispatchEvent = useStoreActions((store:Actions<FileManagerModel<T>>)=>store.dispatchEvent)

    return (
        <div className="file-manager__actions">
            <button type="button" onClick={()=>dispatchEvent(FileManagerEventsType.select)}>Selectionner</button>
        </div>
    )
}

export default FileActions;
