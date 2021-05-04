import {createTypedHooks} from "easy-peasy";
import {FileManagerModel} from './filemanager.store';
import {IFile} from "../interfaces";

const typedHooks = createTypedHooks<FileManagerModel<IFile>>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;
