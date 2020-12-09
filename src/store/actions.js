// import _get from 'lodash/get';
import Config from '../config';
import webApi from '../webApi/webApi';
import _find from 'lodash/find';
import isEqual from 'lodash/isEqual';
export default {
  signIn(ctx, data) {
    ctx.commit('setCurrentUser', data.user);
    ctx.commit('setAccessToken', data.token);
    window.localStorage.setItem(Config.storageUser, JSON.stringify(data.user));
    window.localStorage.setItem(Config.storageToken, data.token);
  },

  signOut(ctx) {
    ctx.commit('setCurrentUser', null);
    ctx.commit('setAccessToken', null);
    window.localStorage.removeItem(Config.storageUser);
    window.localStorage.removeItem(Config.storageToken);
  },

  async loadPlaylists(ctx) {
    console.log('ctx: ', ctx);
    try {
      const playlists = await webApi.getPlaylists(ctx.state.accessToken);
      console.log('playlists: ', playlists);
      ctx.commit('setPlaylists', playlists.items);
      return Promise.resolve();
    } catch (error) {
      console.error('error: ', error);
    }
  },

  async search(ctx, value) {
    try {
      const result = await webApi.search(ctx.state.accessToken, value);
      const ids = result.items.map((id) => id.id.videoId).join(',');
      const res = await webApi.getVideoInfo(ctx.state.accessToken, ids);
      const data = {
        nextPageToken: result.nextPageToken,
        total: result.pageInfo.totalResults,
        query: value,
        items: res.items,
      };
      ctx.commit('setVideoList', data);
      return Promise.resolve();
    } catch (error) {
      console.warn('error: ', error);
    }
  },

  async addPlaylist(ctx, obj) {
    try {
      await webApi.addPlaylist(ctx.state.accessToken, obj);
      ctx.dispatch('loadPlaylists');
      return Promise.resolve();
    } catch (error) {
      console.error('error: ', error);
      return Promise.reject();
    }
  },

  async updatePlayList(ctx, obj) {
    if (isEqual(obj, ctx.getters.currentPlaylist)) {
      return Promise.resolve();
    }
    try {
      await webApi.updatePlaylist(ctx.state.accessToken, obj);
      ctx.dispatch('loadPlaylists');
      return Promise.resolve();
    } catch (error) {
      console.error('error: ', error);
      return Promise.reject();
    }
  },

  async deletePlayList(ctx, id) {
    try {
      await webApi.deletePlaylist(ctx.state.accessToken, id);
      ctx.dispatch('loadPlaylists');
      return Promise.resolve();
    } catch (error) {
      console.error('error: ', error);
      return Promise.reject();
    }
  },

  async setPlaylist(ctx, id) {
    const { playlists } = ctx.state;

    if (playlists && playlists.length) {
      let playlist = _find(playlists, { id: id });

      if (playlist) {
        ctx.commit('setCurrentPlaylist', playlist);
      } else {
        try {
          playlist = await webApi.getPlaylist(ctx.state.accessToken, id);

          if (playlist) {
            ctx.commit('setCurrentPlaylist', playlist);
          }
        } catch (error) {
          console.error('error: ', error);
        }
      }
      return Promise.resolve();
    } else {
      await ctx.dispatch('loadPlaylists');
      ctx.dispatch('setPlaylist', id);
    }
  },
  resetCurrentPlaylist(ctx) {
    ctx.commit('setCurrentPlaylist', null);
  },
  async addVideo(ctx, params) {
    const body = {
      snippet: {
        ...params,
      },
    };

    try {
      await webApi.addVideo(ctx.state.accessToken, body);
      await ctx.dispatch('loadPlaylists');
      return Promise.resolve();
    } catch (error) {
      console.warn('error: ', error);
    }
  },
  resetVideoList(ctx) {
    ctx.commit('resetVideoList');
  },
  async loadMoreVideos(ctx) {
    const {
      videoList: { nextPageToken, query },
      accessToken,
    } = ctx.state;
    if (nextPageToken) {
      try {
        const result = await webApi.loadMoreVideos(accessToken, { nextPageToken, query });
        const ids = result.items.map((id) => id.id.videoId).join(',');
        const res = await webApi.getVideoInfo(accessToken, ids);
        const data = {
          nextPageToken: result.nextPageToken,
          items: res.items,
        };
        ctx.commit('updateVideoList', data);
        return Promise.resolve();
      } catch (error) {
        console.warn('error: ', error);
      }
    }
  },
};
