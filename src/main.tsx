import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FileManager from "./FileManager";

function Main() {

    const onUpdate = (data:any)=>{
        console.log(data)
    }
    return (
        <div>
            <FileManager/>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Main/>
    </React.StrictMode>,
    document.getElementById('root')
)
