<template>
  <div>
    <v-card>
      <SearchComponent v-model="queryString"></SearchComponent>
      <v-container class="d-flex flex-no-wrap justify-space-between">
        <v-btn light link to="playlists/edit">{{
          $t("playlists.createNew")
        }}</v-btn>
        <v-btn light @click="loadPlaylists">{{ $t("actions.update") }}</v-btn>
      </v-container>
    </v-card>
    <v-container>
      <v-row dense>
        <ItemCard
          v-for="(item, i) in filteredPlaylists"
          :key="i"
          :item="item"
          @action1="$router.push(`playlists/edit/${item.id}`)"
          @action2="onDelete(item)"
        >
          <template v-slot:firstBtnIcon> mdi-circle-edit-outline </template>
          <template v-slot:firstBtnText> {{ $t("actions.edit") }} </template>
          <template v-slot:secondBtnIcon> mdi-delete-off-outline </template>
          <template v-slot:secondBtnText> {{ $t("actions.delete") }} </template>
          <template v-slot:firstIcon>
            <span>{{ $t("playlists.published") }}: </span>
          </template>
          <template v-slot:firstIconContent>
            {{ item.publishedAt | dateFormat }}
          </template>
          <template v-slot:secondIcon>
            <v-icon class="mr-1">mdi-video</v-icon>
          </template>
          <template v-slot:secondIconContent>
            {{ item.itemCount }}
          </template>
        </ItemCard>
        <deleteConfirm @cancel="onCancel" @ok="onOk" v-model="dialog">{{
          deleteTitle
        }}</deleteConfirm>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemCard from "../ItemCard";
import SearchComponent from "../SearchComponent";
import DeleteConfirm from "../DeleteConfirm";
export default {
  name: "PlayLists",
  components: {
    ItemCard,
    SearchComponent,
    DeleteConfirm,
  },
  data() {
    return {
      queryString: "",
      deleteItem: null,
      dialog: false,
    };
  },
  methods: {
    ...mapActions(["loadPlaylists"]),
    ...mapActions(["deletePlayList"]),
    onDelete(item) {
      this.dialog = true;
      this.deleteItem = item;
    },
    onCancel() {
      this.deleteItem = null;
    },
    onOk() {
      console.log("this.deleteItem.id: ", this.deleteItem.id);
      this.deletePlayList(this.deleteItem.id);
      this.deleteItem = null;
    },
  },
  computed: {
    ...mapGetters(["playlists"]),
    ...mapGetters(["accessToken"]),
    filteredPlaylists() {
      const regexp = new RegExp(`${this.queryString || ""}`, "gi");
      return this.playlists.filter((item) => {
        return Object.values(item).some((val) => regexp.test(val));
      });
    },
    deleteTitle() {
      return this.deleteItem ? this.deleteItem.title : "";
    },
  },
  filters: {
    dateFormat(value) {
      return new Date(value).toLocaleDateString();
    },
  },
  mounted() {
    if (this.accessToken) {
      this.loadPlaylists();
    }
  },
};
</script>

<style>
</style>
