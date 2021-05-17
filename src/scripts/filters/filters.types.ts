import {FileManagerModel, FileType} from "../store/filemanager-store";
import {State} from "easy-peasy";

export type FileFilter<T extends FileType> = {
    callback: (files: Array<T>, state: State<FileManagerModel<T>>) => Array<T>
}
