<template>
  <div id="app">
    <v-app>
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="2">
            <v-card class="mx-auto" height="100vh">
              <NavBar></NavBar>
            </v-card>
          </v-col>
          <v-col cols="10" class="pa-3">
            <router-view></router-view>
          </v-col>
        </v-row>
        <v-footer padless>
          <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} — <strong>Maksim Falei</strong>
          </v-col>
        </v-footer>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "App",

  components: {
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
</style>
