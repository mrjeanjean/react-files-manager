import FileManagerEvents from "./filemanager-events";

export interface IFile {
    url: string,
    width?: number,
    path?: string
}

export interface FileManagerContextProps {
    files: Array<IFile>,
    filesSelected: Array<IFile>,
    events: FileManagerEvents|null
}
