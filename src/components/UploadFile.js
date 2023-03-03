import React, { useState } from "react";
import './UploadFile.css'

const UploadFile = () => {
  const [files, setFiles] = useState([]);
  const [fileCount, setFileCount] = useState(0);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = [...files];
    const droppedFiles = Array.from(event.dataTransfer.files);
    droppedFiles.forEach((file) => {
      newFiles.push(file);
    });
    setFiles(newFiles);
    setFileCount(newFiles.length);
  };

  const handleInputChange = (event) => {
    const newFiles = [...files];
    const uploadedFiles = Array.from(event.target.files);
    uploadedFiles.forEach((file) => {
      newFiles.push(file);
    });
    setFiles(newFiles);
    setFileCount(newFiles.length); // atualiza o número de arquivos
  };
  

  const handleRemove = (index) => {
    const newFiles = [...files];
    if (newFiles[index]) {
      newFiles.splice(index, 1);
      setFiles(newFiles);
      setFileCount(newFiles.length); // atualiza o número de arquivos
    }
  };
  
  

  const renderProgress = (file) => {
    if (file.progress >= 0 && file.progress < 100) {
      return <div>Progress: {file.progress}%</div>;
    }
  };

  const handleSubmit = () => {
    // handle file upload
    console.log("files", files);
  };

  return (
    <>
    <p>{fileCount == 0?"Nenhum arquivo selecionado":fileCount+" arquivos selecionados"} </p>
    <div className="dropzone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <div className="container-input-file">
           <p>Arraste e solte os arquivos aqui ou</p>
           <label className="upload-file"> Clique para selecionar os arquivos
                <input className="input-file" type="file" onChange={handleInputChange} multiple />
            </label> 
        </div>        
    </div>
    <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name}{" "}
            <button onClick={() => handleRemove(index)}>Remove</button>
            {renderProgress(file)}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Upload</button>
    </>
    
  );
};

export default UploadFile;
