<template>
  <v-row justify="center">
    <v-card justify="center" width="100%">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="onBack()">
          <v-icon>mdi-arrow-left-circle-outline</v-icon>
        </v-btn>
        <v-toolbar-title>Playlist</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="onSave()"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>General</v-subheader>
        <v-list-item>
          <v-container fluid>
            <v-text-field
              v-model="title"
              :rules="titleRules"
              label="Title"
              required
            ></v-text-field>
          </v-container>
        </v-list-item>
        <v-list-item>
          <v-container fluid>
            <v-textarea
              label="Description"
              v-model="description"
              :rules="descriptionRules"
            ></v-textarea>
          </v-container>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="privacy"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Private playlist?</v-list-item-title>
            <v-list-item-subtitle
              >The playlist's privacy status</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-container fluid>
            <TagField v-model="tags" />
          </v-container>
        </v-list-item>
      </v-list>
    </v-card>
  </v-row>
</template>

<script>
import TagField from "../TagField";
import { mapGetters, mapActions } from "vuex";
import Config from "../../config";
export default {
  name: "EditPlaylist",
  components: {
    TagField,
  },
  data() {
    return {
      id: null,
      title: "",
      description: "",
      privacy: false,
      tags: null,
      titleRules: [(v) => !!v || "Title is required"],
      descriptionRules: [(v) => v.length < 50 || "Max characters - 50"],
    };
  },
  computed: {
    ...mapGetters(["currentPlaylist"]),
  },
  methods: {
    ...mapActions(["resetCurrentPlaylist"]),
    ...mapActions(["updatePlayList"]),
    ...mapActions(["addPlaylist"]),
    onSave() {
      const data = {
        snippet: {
          title: this.title,
          description: this.description,
          tags: this.tags,
        },
        status: {
          privacyStatus: this.privacy
            ? Config.privacy.private
            : Config.privacy.public,
        },
      };

      if (this.id) {
        data.id = this.id;
        this.updatePlayList(data).then(() => {
          this.resetCurrentPlaylist();
          this.$router.go(-1);
        });
      } else {
        this.addPlaylist(data).then(() => {
          this.resetCurrentPlaylist();
          this.$router.go(-1);
        });
      }
    },
    onBack() {
      this.resetCurrentPlaylist();
      this.$router.go(-1);
    },
  },
  mounted() {
    const { id } = this.$route.params;
    if (id) {
      this.$store.dispatch("setPlaylist", id).then(() => {
        const data = this.currentPlaylist;
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.privacy =
          data.privacyStatus === Config.privacy.private ? true : false;
        this.tags = data.tags;
      });
    }
  },
};
</script>

<style>
</style>
