import _get from 'lodash/get';
export default {
  currentUser(state) {
    return state.user;
  },
  accessToken(state) {
    return state.accessToken;
  },
  playlists(state) {
    const list = state.playlists || [];
    return list.map((item) => {
      return {
        id: _get(item, 'id', ''),
        itemCount: _get(item, 'contentDetails.itemCount', ''),
        title: _get(item, 'snippet.title', ''),
        description: _get(item, 'snippet.description', ''),
        publishedAt: _get(item, 'snippet.publishedAt', ''),
        preview: _get(item, 'snippet.thumbnails.standard.url', ''),
      };
    });
  },
  playlistsIds(state) {
    const list = state.playlists || [];
    return list.map((item) => {
      return {
        value: _get(item, 'id', ''),
        text: `${_get(item, 'snippet.title', '')} - ${_get(item, 'contentDetails.itemCount', '')}`,
      };
    });
  },
  currentPlaylist(state) {
    return {
      id: _get(state, 'currentPlaylist.id', ''),
      title: _get(state, 'currentPlaylist.snippet.title', ''),
      description: _get(state, 'currentPlaylist.snippet.description', ''),
      tags: _get(state, 'currentPlaylist.snippet.tags', []),
      privacyStatus: _get(state, 'currentPlaylist.status.privacyStatus', false),
    };
  },
  videoList(state) {
    const list = state.videoList.list || [];
    return list.map((item) => {
      return {
        id: _get(item, 'id', ''),
        title: _get(item, 'snippet.title', ''),
        description: _get(item, 'snippet.description', ''),
        preview: _get(item, 'snippet.thumbnails.high.url', ''),
        viewCount: _get(item, 'statistics.viewCount', ''),
        likeCount: _get(item, 'statistics.likeCount', ''),
      };
    });
  },
};
