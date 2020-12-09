import Config from '../config';
const PARTS = 'contentDetails,snippet,status';
function getHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json; charset=UTF-8',
  };
}

const webApi = {
  getPlaylists(token) {
    const options = {
      headers: getHeaders(token),
      method: 'GET',
    };

    const url = `${Config.baseApiUrl}/playlists?mine=true&part=${PARTS}&maxResults=50`;
    return fetch(url, options).then((res) => res.json());
  },
  search(token, text) {
    const options = {
      headers: getHeaders(token),
      method: 'GET',
    };
    const url = `${Config.baseApiUrl}/search?type=video&part=id&maxResults=6&q=${text}`;
    return fetch(url, options).then((res) => res.json());
  },
  getVideoInfo(token, ids) {
    const options = {
      headers: getHeaders(token),
      method: 'GET',
    };

    const url = `${Config.baseApiUrl}/videos?id=${ids}&part=snippet,statistics&maxResults=6`;
    return fetch(url, options).then((res) => res.json());
  },
  addPlaylist(token, object) {
    const options = {
      headers: getHeaders(token),
      method: 'POST',
      body: JSON.stringify(object),
    };
    const url = `${Config.baseApiUrl}/playlists?part=snippet,status`;
    return fetch(url, options).then((res) => res.json());
  },
  updatePlaylist(token, object) {
    const options = {
      headers: getHeaders(token),
      method: 'PUT',
      body: JSON.stringify(object),
    };
    const url = `${Config.baseApiUrl}/playlists?part=snippet,status`;
    return fetch(url, options).then((res) => res.json());
  },
  deletePlaylist(token, id) {
    const options = {
      headers: getHeaders(token),
      method: 'DELETE',
    };
    const url = `${Config.baseApiUrl}/playlists?id=${id}`;
    return fetch(url, options);
  },
  getPlaylist(token, id) {
    const options = {
      headers: getHeaders(token),
      method: 'GET',
    };
    const url = `${Config.baseApiUrl}/playlists?mine=true&part=${PARTS}id=${id}`;
    return fetch(url, options).then((res) => res.json());
  },
  addVideo(token, params) {
    const options = {
      headers: getHeaders(token),
      method: 'POST',
      body: JSON.stringify(params),
    };
    const url = `${Config.baseApiUrl}/playlistItems?part=snippet`;
    return fetch(url, options).then((res) => res.json());
  },
  loadMoreVideos(token, { nextPageToken, query }) {
    const options = {
      headers: getHeaders(token),
      method: 'GET',
    };
    const url = `${Config.baseApiUrl}/search?type=video&part=id&maxResults=6&pageToken=${nextPageToken}&q=${query}`;
    return fetch(url, options).then((res) => res.json());
  },
};

export default webApi;
