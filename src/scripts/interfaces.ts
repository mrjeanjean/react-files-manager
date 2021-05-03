import FileManagerEvents from "./FileManagerEvents";

export interface IFile {
    url: string,
    width?: number
}

export interface FileManagerContextProps {
    files: Array<IFile>,
    filesSelected: Array<IFile>,
    events: FileManagerEvents|null
}
