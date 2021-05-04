import {useEffect, useState} from "react";

export function useStateWithCallback<T>(initialState: T, callback: Function): [T, Function] {
    const [state, setState] = useState<T>(initialState);
    useEffect(() => callback(state), [state]);

    return [state, setState];
}

export function arrayHas<T>(collection: Array<T>, item: T): boolean {
    return collection.some((entry: T) => item === entry);
}

export function arrayRemove<T>(collection: Array<T>, item: T) {
    return collection.filter((entry: T) => {
        return entry !== item;
    })
}

export function withPlural(collection: Array<any>, singular: string, plural: string){
    return collection.length > 1 ? plural : singular;
}
