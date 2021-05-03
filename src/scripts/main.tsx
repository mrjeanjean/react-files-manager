import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/index.scss';
import FileManager from "./components/FileManager";

function Main() {
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
