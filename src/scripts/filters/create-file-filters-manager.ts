import {FileFilter} from "./filters.types";
import {State} from "easy-peasy";
import {FileManagerModel} from "../store/filemanager-store";

export function createFileFiltersManager<T>() {
    const fileFilters: Set<FileFilter<T>> = new Set<FileFilter<T>>();

    const addFilter = (filter: FileFilter<T>) => {
        fileFilters.add(filter);
        return fileFilters;
    }

    const applyFilters = (files: Array<T>, state: State<FileManagerModel<T>>) => {

        fileFilters.forEach((fileFilter: FileFilter<T>) => {
            files = fileFilter.callback(files, state);
        })

        return files;
    }

    return {
        addFilter,
        applyFilters
    }
}
