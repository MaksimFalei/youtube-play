<template>
  <div ref="top">
    <v-card>
      <SearchComponent searchButton v-model="queryString"></SearchComponent>
    </v-card>
    <v-container>
      <v-row dense>
        <ItemCard
          v-for="(item, i) in videoList"
          :key="i"
          :item="item"
          @action1="onAdd(item.id)"
          @action2="onDelete(item)"
        >
          <template v-slot:firstBtnIcon> mdi-heart-plus-outline </template>
          <template v-slot:firstBtnText> Add </template>
          <template v-slot:secondBtnIcon> mdi-play-circle </template>
          <template v-slot:secondBtnText> Play </template>
          <template v-slot:firstIcon>
            <v-icon class="mr-1">mdi-eye-circle-outline</v-icon>
          </template>
          <template v-slot:firstIconContent>
            {{ item.viewCount }}
          </template>
          <template v-slot:secondIcon>
            <v-icon class="mr-1">mdi-thumb-up-outline</v-icon>
          </template>
          <template v-slot:secondIconContent>
            {{ item.likeCount }}
          </template>
        </ItemCard>
      </v-row>
    </v-container>
    <v-card-text style="height: 100px; position: relative">
      <v-fab-transition>
        <v-btn
          v-show="!hidden"
          color="primary"
          fixed
          dark
          bottom
          right
          fab
          @click="scrollToTop"
        >
          <v-icon>mdi-chevron-triple-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
    <v-card color="primary" dark v-show="isLoadingNeeded" ref="paragraph">
      <v-card-text>
        Please stand by
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
    <VideoDialog
      v-model="dialog"
      :options="playlistsIds"
      @save="onSave"
      @cancel="videoId = null"
    ></VideoDialog>
  </div>
</template>

<script>
import SearchComponent from "../SearchComponent";
import ItemCard from "../ItemCard";
import VideoDialog from "../VideoDialog";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Videos",
  components: {
    SearchComponent,
    ItemCard,
    VideoDialog,
  },
  data() {
    return {
      queryString: "",
      dialog: false,
      videoId: null,
      hidden: false,
    };
  },
  methods: {
    ...mapActions(["search"]),
    ...mapActions(["addVideo"]),
    ...mapActions(["resetVideoList"]),
    ...mapActions(["loadMoreVideos"]),
    onAdd(id) {
      this.videoId = id;
      this.dialog = true;
    },
    onSave(value) {
      if (value && this.videoId) {
        const data = {
          playlistId: value,
          resourceId: {
            videoId: this.videoId,
            kind: "youtube#video",
          },
        };

        this.addVideo(data).then(() => {
          this.videoId = null;
        });
      }
    },
    initObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadMoreVideos();
          }
        });
      });
      this.observer.observe(this.$refs.paragraph.$el);
    },
    scrollToTop() {
      this.$refs.top.$el.scrollIntoView({
        behavior: "smooth",
      });
    },
  },
  computed: {
    ...mapGetters(["videoList"]),
    ...mapGetters(["playlistsIds"]),
    isLoadingNeeded() {
      return !!this.videoList.length;
    },
  },
  watch: {
    queryString(v) {
      if (!v) {
        this.resetVideoList();
      } else {
        this.search(v);
      }
    },
  },
  mounted() {
    this.initObserver();
  },
};
</script>

<style>
</style>
