import React, { useState } from "react";
import { allowedMIMETypes } from "../constants";
import { UPLOAD_VIDEO } from "../graphql/mutation";
import { useMutation } from "@apollo/client";

const UploadForm = ({ setUploading, setFileError, uploading, refetch }) => {
  const [file, setFile] = useState(false);
  const [uploadVideo, { data }] = useMutation(UPLOAD_VIDEO);
  const handleUpload = async (file, mutation, refetch) => {
    const { file: f, validity } = file;
    if (validity.valid) {
      if (f.size * 0.000001 <= 50 && allowedMIMETypes.includes(f.type)) {
        setUploading(true);
        const {
          data: { uploadSingleFile },
        } = await mutation({
          variables: { file: f },
          fetchPolicy: "no-cache",
        });
        refetch();
        setUploading(false);
      } else {
        setFileError(`invalid upload please check the selected file`);
      }
    }
  };
  const handleChange = (event) => {
    setUploading(false);
    setFileError(false);
    const {
      target: {
        validity,
        files: [file],
      },
    } = event;
    console.log(event);
    setFile({ file, validity });
  };
  return (
    <div className="col-12 d-flex justify-content-center align-items-center h-25">
      <input
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="select video file maximum upto 50MB"
        type="file"
        required
        onChange={(e) => handleChange(e)}
        disabled={uploading}
      />
      <button
        disabled={uploading}
        className="btn btn-primary"
        onClick={(e) => handleUpload(file, uploadVideo, refetch)}
      >
        Submit
      </button>
    </div>
  );
};

export default UploadForm;
