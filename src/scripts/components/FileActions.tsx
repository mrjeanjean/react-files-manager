import React from "react";
import {useStoreActions} from "../store/filemanager.hooks";
import {FileManagerEventsType} from "../FileManagerEvents";

function FileActions(){

    const dispatchEvent = useStoreActions((store)=>store.dispatchEvent)

    return (
        <div className="file-manager__actions">
            <button type="button" onClick={()=>dispatchEvent(FileManagerEventsType.select)}>Selectionner</button>
        </div>
    )
}

export default FileActions;
