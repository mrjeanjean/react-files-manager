import React from "react";
import {State, useStoreState} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager-store";

export default function FileManagerLoader<T>() {

    const isLoading = useStoreState((state: State<FileManagerModel<T>>) => state.isLoading);

    return (
        <>
            {isLoading && (
                <div className="file-manager__loader">
                    <div className="file-manager__loader__inner">
                        <div/>
                        <div/>
                    </div>
                </div>
            )}

        </>
    )
}
