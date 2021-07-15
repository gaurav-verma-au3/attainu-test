const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

module.exports = {
  upload: async ({ stream }) => {
    return new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream(
        { resource_type: "video", chunk_size: 50000000 },
        function (error, result) {
          if (result) {
            console.log("result ", result);
            resolve({ success: true, data: result });
          } else {
            console.log("error ", error);
            reject({ success: false, data: error });
          }
        }
      );
      stream.pipe(streamLoad);
    });
  },
};
