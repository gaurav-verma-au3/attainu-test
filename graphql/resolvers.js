const Videos = require("../models/Videos");
const { GraphQLUpload } = require("graphql-upload");
const cloudinary = require("../config/cloudinary");
module.exports = {
  Upload: GraphQLUpload,
  Query: {
    videos: async (parent, args, context, info) => {
      const videos = await Videos.findAll();
      return { videos };
    },
  },
  Mutation: {
    uploadSingleFile: async (root, { file }) => {
      try {
        const { createReadStream, filename } = await file;
        const uploadStream = createReadStream();

        const result = await cloudinary.upload({ stream: uploadStream });
        if (result.success) {
          const video_obj = {
            video_id: result.data.asset_id,
            name: filename,
            url: result.data.secure_url,
            public_id: result.data.public_id,
          };
          // add assest to db
          const video = await Videos.create(video_obj);
          return null;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
