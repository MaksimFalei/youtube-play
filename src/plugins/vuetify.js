import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#f44336',
        secondary: '#2196f3',
        accent: '#9c27b0',
        error: '#ff5722',
        warning: '#ff9800',
        info: '#00bcd4',
        success: '#cddc39',
      },
    },
    dark: true,
  },
});
