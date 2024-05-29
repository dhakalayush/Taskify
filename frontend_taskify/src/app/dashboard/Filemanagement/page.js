"use client";
import React, { useState, useRef } from "react";
import Styles from "./page.module.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage, AiOutlineFilePdf } from "react-icons/ai";

export default function Attachment() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No Selected File");
  const fileInputRef = useRef(null);

  const handleEvents = ({ target: { files } }) => {
    files[0] && setFileName(files[0].name);
    if (files) {
      const fileObject = files[0];
      const fileType = fileObject.type.split("/")[0]; // Get file type (image or application)
      setFile({ type: fileType, url: URL.createObjectURL(fileObject) });
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={Styles.files}>
      <form action="" className={Styles.form} onClick={handleClick}>
        <input
          ref={fileInputRef}
          className={Styles.browse}
          type="file"
          name="file"
          id="fileInput"
          hidden
          onChange={handleEvents}
          accept=".pdf, .jpg, .jpeg, .png" // Accept both image and PDF files
        />
        {file ? (
          <>
            {file.type === "image" ? ( // Check if file is an image
              <img className={Styles.image} src={file.url} alt={fileName} />
            ) : file.type === "application" ? ( // Check if file is a PDF
              <div className={Styles.pdfViewer}>
                <iframe
                  src={`${file.url}#toolbar=0`}
                  title={fileName}
                  height={550}
                  width={800}
                ></iframe>
              </div>
            ) : null}
          </>
        ) : (
          <MdCloudUpload color="#1475cf" size={60} />
        )}
      </form>
      <section className={Styles.edit}>
        {file && (
          <>
            {file.type === "image" ? (
              <AiFillFileImage color="#1475cf" />
            ) : file.type === "application" ? (
              <AiOutlineFilePdf color="#1475cf" />
            ) : null}
            <span>
              {fileName}
              <MdDelete
                className={Styles.delete}
                size={30}
                onClick={() => {
                  setFileName("No Selected File");
                  setFile(null);
                }}
              />
            </span>
          </>
        )}
      </section>
    </div>
  );
}
