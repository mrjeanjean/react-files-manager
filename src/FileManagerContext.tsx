import React, {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {FileManagerContextProps, IFile} from "./interfaces";
import FileManagerEvents, {FileManagerEventsType} from "./FileManagerEvents";

export const FileManagerContext = createContext<FileManagerContextProps>({
    files: [] as Array<IFile>,
    filesSelected: [] as Array<IFile>,
    events: null
});

export function useFiles() {
    return useContext(FileManagerContext).files;
}

export function useSelectedFiles() {
    return useContext(FileManagerContext).filesSelected;
}

export function useEvents() {
    return useContext(FileManagerContext).events;
}

interface FileManagerContextProviderProps {
    children: ReactNode;
    files: Array<IFile>;
}

function FileManagerProvider({children, files}: FileManagerContextProviderProps) {
    const eventsRef = useRef<FileManagerEvents>(new FileManagerEvents());
    const [filesSelected, setFilesSelected] = useState<Array<IFile>>([]);

    useEffect(function () {
        const events = eventsRef.current;

        const onFilesSelectionChanged = (data: any) => {
            setFilesSelected(data.filesSelected);
        }
        events.add(FileManagerEventsType.select, onFilesSelectionChanged);

        return ()=> {
            events.remove(FileManagerEventsType.select, onFilesSelectionChanged);
        }
    }, [])

    return (
        <FileManagerContext.Provider value={{files: files, events: eventsRef.current, filesSelected: filesSelected}}>
            {children}
        </FileManagerContext.Provider>
    )
}

export default FileManagerProvider;
