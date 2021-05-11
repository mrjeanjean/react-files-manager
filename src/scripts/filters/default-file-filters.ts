import {FileManagerModel, FileType} from "../store/filemanager-store";
import {State} from "easy-peasy";
import {FileFilter} from "./filters.types";

export function getDefaultFileFilters<T extends FileType>(): Array<FileFilter<T>> {
    return [
        {
            callback: (files: Array<T>, state: State<FileManagerModel<T>>) => {
                return files.filter((file: T) => file.path === state.currentPath)
            }
        }
    ]
}
