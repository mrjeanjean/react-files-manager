import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FileManager from "./FileManager";

interface File{
    url: string,
    width ?: number
}

const fileList:Array<File> = [
    {url: "https://picsum.photos/id/350/200/300", width: 250},
    {url: "https://picsum.photos/id/351/250/300", width: 250},
    {url: "https://picsum.photos/id/352/300/200", width: 250},
    {url: "https://picsum.photos/id/353/300/300", width: 250},
    {url: "https://picsum.photos/id/354/200/300", width: 250}
]

function Image({file}: { file?: File }) {
    return (
        <>
            {file && (
                <img src={file.url} alt=""/>
            )}
        </>
    )
}

function Main() {
    const [images, setImages] = useState<Array<File>>();

    return (
        <div>
            <FileManager<File>
                filesList={fileList}
                onFileSelected={(files: Array<File>) => {
                    setImages([
                        ...files
                    ])
                }}
                multiple={true}
                child={Image}
            />
            <div className="images-viewer">
                {images?.map(image=>(
                    <Image file={image} />
                ))}
            </div>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Main/>
    </React.StrictMode>,
    document.getElementById('root')
)
