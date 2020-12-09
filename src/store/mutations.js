export default {
  setCurrentUser(state, user) {
    state.user = user;
  },
  setAccessToken(state, token) {
    state.accessToken = token;
  },
  setPlaylists(state, list) {
    state.playlists = list;
  },
  setCurrentPlaylist(state, value) {
    state.currentPlaylist = value;
  },
  setVideoList(state, data) {
    state.videoList.list = data.items;
    state.videoList.nextPageToken = data.nextPageToken;
    state.videoList.total = data.total;
    state.videoList.query = data.query;
  },
  updateVideoList(state, data) {
    state.videoList.list.push(...data.items);
    state.videoList.nextPageToken = data.nextPageToken;
  },
  resetVideoList(state) {
    state.videoList.list = [];
    state.videoList.nextPageToken = null;
    state.videoList.total = 0;
    state.videoList.query = '';
  },
  setCurrentVideo(state, value) {
    state.currentVideo = value;
  },
};
