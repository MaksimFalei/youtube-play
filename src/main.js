import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import vuetify from './plugins/vuetify';
import store from './store/index';
import VueRouter from 'vue-router';
import GAuth from 'vue-google-oauth2';
import Config from './config';
import VueI18n  from 'vue-i18n';

import Home from './components/pages/Home';
import PlayLists from './components/pages/Playlists';
import EditPlaylist from './components/pages/EditPlaylist';
import Videos from './components/pages/Videos';
import en from './i18n/en.json';
import ru from './i18n/ru.json';

Vue.config.productionTip = false;

Vue.use(GAuth, Config.gauthOption);

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueI18n);

const i18n = new VueI18n({
  messages: {
    en,
    ru
  },
  locale: 'en',
  fallbackLocale: 'en',
});

const routes = [
  { path: '/', component: Home },
  { path: '/playlists', component: PlayLists },
  { path: '/playlists/edit/:id?', component: EditPlaylist },
  { path: '/videos/:id?', component: Videos },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

const appStore = new Vuex.Store(store);

let user = window.localStorage.getItem(Config.storageUser);
const token = window.localStorage.getItem(Config.storageToken);

if (user && token) {
  user = JSON.parse(user);
  appStore.dispatch('signIn', { user, token });
  appStore.dispatch('loadPlaylists');
}

new Vue({
  vuetify,
  router,
  store: appStore,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
