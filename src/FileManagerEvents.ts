export enum FileManagerEventsType{
    delete,
    select
}

interface IFileManagerEvents{
    type: FileManagerEventsType,
    callback: Function
}

/**
 * Class representing events fired by PageSlider
 */
class FileManagerEvents{
    observers: Array<IFileManagerEvents>;

    public constructor() {
        this.observers = new Array<IFileManagerEvents>();
    }

    public add(type: FileManagerEventsType, callback: Function){
        this.observers.push({
            type,
            callback
        })
    }

    /**
     * @param {FileManagerEventsType} type
     * @param {Function} callback
     */
    public remove(type:FileManagerEventsType, callback: Function){
        this.observers = this.observers.filter(entry=>
            entry.type !== type && entry.callback !== callback
        )
    }

    /**
     * @param {FileManagerEventsType} type
     * @param {Object} data
     */
    public fire(type: FileManagerEventsType, data:any){
        console.log(this.observers);
        this.observers.forEach(entry=>{
            if(entry.type === type){
                entry.callback(data);
            }
        });
    }
}

export default FileManagerEvents;
