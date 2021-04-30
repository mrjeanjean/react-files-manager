import React, {useEffect, useState} from 'react';
import './FileManager.css';

interface Props<Type> {
    filesList: Array<Type>;
    onFileSelected?: Function;
    multiple ?: boolean,
    child: any
}

function FileManager<Type>({filesList, onFileSelected, multiple = true, child}: Props<Type>) {
    const [selectedFiles, setSelectedFiles] = useState<Set<Type>>(new Set());

    const toggleSelectedFile = (file: Type) =>{
        const tempSet = new Set<Type>([
                ...selectedFiles
            ]
        );

        if(multiple){
            if(tempSet.has(file)){
                tempSet.delete(file);
            }else{
                tempSet.add(file);
            }
        }else{
            if(tempSet.has(file)){
                tempSet.clear();
            }else{
                tempSet.clear();
                tempSet.add(file);
            }
        }

        setSelectedFiles(tempSet);
    }

    return (
        <div className="files-list">
            {filesList.map((file, index) => {
                return (
                <div
                    className={"files-list__item " + (selectedFiles.has(file) ? "selected" : "") }
                    key={index}
                    onClick={e=>toggleSelectedFile(file)}
                >
                    {React.createElement(child, {file})}
                </div>
            )})}

            <button type="button" onClick={e=>onFileSelected ? onFileSelected([...selectedFiles]) : null}>Valider</button>
        </div>
    )
}

export default FileManager
