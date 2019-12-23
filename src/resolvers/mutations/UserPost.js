const s3Upload = require("../../utils/s3Upload");

module.exports = {
  async createPost(_, args, { photon, request }, info) {
    await s3Upload(args.data.media[0]);
  }
};
