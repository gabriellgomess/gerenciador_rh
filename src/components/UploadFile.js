import React, { useEffect } from 'react'
import Uppy from '@uppy/core'
import Webcam from '@uppy/webcam'
import { Dashboard, StatusBar, ProgressBar, FileInput } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/status-bar/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/file-input/dist/style.css'
import '@uppy/dashboard/dist/style.css'



const uppy = new Uppy().use(Webcam)

const UploadFile = () => {

    return(
        <div>
            <Dashboard uppy={uppy} plugins={['Webcam']} />
        </div>
    )
}

export default UploadFile;