<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Sign In
        </v-btn>
      </template>

      <v-card>
        <v-card-title> Input your YouTube API Key </v-card-title>

        <v-card-text>
          <v-container>
            <v-text-field
              v-model="value"
              filled
              label="API KEY"
              clearable
            ></v-text-field>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onClick"> Login </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "LoginModal",
  data() {
    return {
      dialog: false,
      value: "",
    };
  },
  methods: {
    async onClick() {
      const googleUser = await this.$gAuth.signIn();
      console.log("googleUser: ", googleUser);
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>
