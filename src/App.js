import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Video from "./components/Video";
import Spinner from "./components/Spinner";
import Error from "./components/Error";
import { GET_VIDEOS } from "./graphql/queries";
import UploadForm from "./components/UploadForm";
const App = () => {
  const [uploading, setUploading] = useState(false);
  const { loading, error, data: videos, refetch } = useQuery(GET_VIDEOS);
  const [fileError, setFileError] = useState(false);

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row h-100">
        <UploadForm
          setUploading={setUploading}
          refetch={refetch}
          uploading={uploading}
          setFileError={setFileError}
        />
        <div className="col-12 h-25">
          {fileError ? (
            <Error message={fileError} />
          ) : uploading ? (
            <Spinner />
          ) : null}
        </div>
        <div className="col-12 h-50">
          {loading ? (
            <Spinner />
          ) : videos?.videos?.videos.length ? (
            videos.videos.videos.map((v) => <Video video={v} />)
          ) : (
            <Error message="No Uploads" />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
