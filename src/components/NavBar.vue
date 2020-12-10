<template>
  <v-navigation-drawer permanent fixed>
    <v-list v-if="currentUser">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon v-if="!currentUser.avatar"> mdi-account </v-icon>
          <v-img v-if="currentUser.avatar" :src="currentUser.avatar"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">{{
            currentUser.name
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-hover v-slot="{ hover }">
        <v-list-item>
          <v-list-item-avatar>
            <v-btn class="sx-2" fab @click="onLogOut">
              <v-icon dark> mdi-logout </v-icon>
            </v-btn>
          </v-list-item-avatar>
          <v-fade-transition>
            <v-list-item-content v-if="hover" class="d-flex account-icon">
              <v-list-item-title> {{ $t('navbar.logOut') }} </v-list-item-title>
            </v-list-item-content>
          </v-fade-transition>
        </v-list-item>
      </v-hover>
    </v-list>

    <v-list v-if="!currentUser">
      <v-list-item class="px-2">
        <v-btn class="px-2" @click="onLogin">
          <v-list-item-avatar>
            <v-icon> mdi-account </v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="d-flex">
            <v-list-item-title> {{ $t('navbar.signIn') }} </v-list-item-title>
          </v-list-item-content>
        </v-btn>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item link to="/">
        <v-list-item-content>
          <v-list-item-title> {{ $t('navbar.home') }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link to="/videos">
        <v-list-item-content>
          <v-list-item-title> {{ $t('navbar.search') }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link to="/playlists">
        <v-list-item-content>
          <v-list-item-title> {{ $t('navbar.playlists') }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-select
            :items="[
              { text: $t('lang.en'), value: 'en' },
              { text: $t('lang.ru'), value: 'ru' },
            ]"
            @input="onChangeLocale"
            v-model="locale"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import _get from "lodash/get";
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["currentUser"]),
  },
  data() {
    return {
      locale: this.$i18n.locale,
    }
  },
  methods: {
    async onLogin() {
      try {
        const res = await this.$gAuth.signIn();

        const user = {
          id: _get(res, "Ca", ""),
          name: _get(res, "wt.Ad", ""),
          email: _get(res, "wt.cu", ""),
          avatar: _get(res, "wt.hK", ""),
        };
        console.log("user: ", user);

        const token = _get(res, "xc.access_token", "");
        this.$store.dispatch("signIn", { user, token });
      } catch (err) {
        console.error("err: ", err);
      }
    },
    async onLogOut() {
      try {
        await this.$gAuth.signOut();
        this.$store.dispatch("signOut");
      } catch (error) {
        console.error("error: ", error);
      }
    },
    onChangeLocale() {
      this.$i18n.locale = this.locale;
    },
  },
};
</script>

<style>
</style>
