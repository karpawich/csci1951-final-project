import React, { useRef, useState } from 'react'
import { uploadFile } from '../actions/firebaseStorage'
//import './.scss'

// interface UploadFileProps {
//   text: string
//   editing: boolean
//   onEdit: (newText: string) => void
//   setEditing: (editing: boolean) => void
// }
// const { editing, text, onEdit, setEditing } = props

export const UploadFile = () => {
    const fileInputRef = useRef()
    const [progress, setProgress] = useState(0)
    
    const uploadFiles = async () => {
        const urls = []

        const files = fileInputRef.current.files
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            try {
                const url = await uploadFile(file, setProgress, 'test');
                urls.push(url);
            } catch (error) {
                console.error(`Failure to upload file ${file.name}`);
            }
        }
        
        // reset file input
        fileInputRef.current.value = null;

        goToDB(urls);
    }

    const goToDB = async (urls) => {
        // TODO @max
    }

    return (
        <div>
            <hr />
            <input type="file" onChange={() => uploadFiles()} ref={fileInputRef} multiple></input>
            <p>{progress}</p>
            <hr />
        </div>
    );
}