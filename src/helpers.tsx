import {useEffect, useState} from "react";

export function useStateWithCallback<T>(initialState: T, callback: Function): [T, Function] {
    const [state, setState] = useState<T>(initialState);
    useEffect(() => callback(state), [state]);

    return [state, setState];
};
