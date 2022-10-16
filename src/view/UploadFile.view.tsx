import React, { Ref, useRef, useState } from "react";
import { sign as signRequest } from "../domain/PdfEstructure"

type Props = {};

export const UploadFile = (props: Props) => {
  const [image, setImage] = useState();
  const [sign, setSign] = useState();
  const inputFiles: Ref<any> = useRef(null);
  const inputSign: Ref<any> = useRef(null);

  const handleUpload = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      setImage(files);
      console.log(files);
    }
  };

  const handleSignChange = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      setSign(files);
      console.log(files);
    }
  };

  const handleClick = () => {
    inputFiles.current!.click();
  };

  const handleSign = () => {
    inputSign.current!.click();
  };

  const complete = () =>{
    console.log("complete");
    if(!image || !sign){
      alert("Please upload image and sign");
      return;
    }
    signRequest(sign[0], image);
  }

  return (
    <>
      <h1>Upload File</h1>
      <button onClick={complete}>complete</button>
      <div>
        <input
          className="hidden"
          type="file"
          name="files"
          ref={inputFiles}
          onChange={handleUpload}
          multiple
        />
        <input type="file" name="sign" id="sign" ref={inputSign} className="hidden" onChange={handleSignChange} accept='image/png , image/jpg'/>
        <button onClick={handleClick}>upload</button>
        <button onClick={handleSign}>Firmar</button>
      </div>
      <div>
        <h2>sign:</h2>
        <ul>
            {sign && (<li><img src={URL.createObjectURL(sign[0])} alt="" /></li>)}
        </ul>
      </div>
      <div>
        <h2>Files:</h2>
        <ul>
          {image &&
            Array.from<File>(image).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
        </ul>
      </div>
      <div>
        <a ></a>
      </div>
    </>
  );
};
