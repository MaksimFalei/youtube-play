const Config = {
  gauthOption: {
    clientId: '541262397487-f228unl6muu58sn7cofcu5vgt0vu5qfp.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/youtube',
    prompt: 'select_account',
  },
  ApiKey: 'AIzaSyABNh-fpdVlNM8c2ptR2LCn0COW7xBZknM',
  storageUser: 'AppUser',
  storageToken: 'UserToken',
  baseApiUrl: 'https://www.googleapis.com/youtube/v3',
  resources: {
    playlist: 'playlist',
    video: 'video',
  },
  privacy: {
    private: 'private',
    public: 'public',
  },
};

export default Config;
