module.exports = {
  media(parent, _, { photon }) {
    return photon.media.findMany({
      where: {
        post: {
          id: parent.id
        }
      }
    });
  },
  likes(parent, _, { photon }) {
    return photon.postLikes.findMany({
      where: {
        post: {
          id: parent.id
        }
      },
      last: 5
    });
  },
  likeCount(parent, _, { photon}) {
	 // TODO: REPLACE WITH ACTUAL AGGREGATION
	 const likes = await photon.likes.findMany({
		where: {
		  post: {
			  id: parent.id
		  }
		}
	  });

	  return likes.length;
  },
  comments(parent, _, { photon }) {
    return photon.postComments.findMany({
      where: {
        post: {
          id: parent.id
        }
      },
      last: 5
    });
  },
  commentCount(parent, _, { photon}) {
	 // TODO: REPLACE WITH ACTUAL AGGREGATION
	 const comments = await photon.comments.findMany({
		where: {
		  post: {
			  id: parent.id
		  }
		}
	  });

	  return comments.length;
},
};
