<template>
  <v-col cols="4">
    <v-card
      dark
      height="100%"
      class="d-flex flex-column flex-no-wrap justify-space-between"
    >
      <div class="d-flex flex-no-wrap justify-space-between top-part">
        <div class="d-flex flex-no-wrap flex-column justify-space-between">
          <v-card-title class="headline" v-text="item.title"></v-card-title>
          <div class="d-flex flex-no-wrap">
            <v-card-subtitle class="align-self-end">
              {{ item.description | truncateString(maxLengthText) }}
            </v-card-subtitle>
          </div>
          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ml-2 mt-3"
                  fab
                  icon
                  height="40px"
                  right
                  width="40px"
                  v-on="on"
                  v-bind="attrs"
                  @click="$emit('action1')"
                >
                  <v-icon>
                    <slot name="firstBtnIcon"></slot>
                  </v-icon>
                </v-btn>
              </template>
              <span>
                <slot name="firstBtnText"> {{ $t("actions.edit") }} </slot>
              </span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ml-2 mt-3"
                  fab
                  icon
                  height="40px"
                  right
                  width="40px"
                  v-on="on"
                  v-bind="attrs"
                  @click="$emit('action2')"
                >
                  <v-icon>
                    <slot name="secondBtnIcon"></slot>
                  </v-icon>
                </v-btn>
              </template>
              <span>
                <slot name="secondBtnText"></slot>
              </span>
            </v-tooltip>
          </v-card-actions>
        </div>

        <v-avatar class="ma-3" size="125" tile>
          <v-img :src="item.preview"></v-img>
        </v-avatar>
      </div>
      <v-container
        class="d-flex flex-no-wrap justify-space-between"
        align="center"
      >
        <div class="align-self-end">
          <slot name="firstIcon"></slot>
          <span class="subheading mr-2">
            <slot name="firstIconContent"></slot>
          </span>
        </div>
        <div>
          <slot name="secondIcon"></slot>
          <span class="subheading">
            <slot name="secondIconContent"></slot>
          </span>
        </div>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "ItemCard",
  props: {
    item: Object,
  },
  data() {
    return {
      maxLengthText: 50,
    };
  },
  filters: {
    truncateString(str, num) {
      if (!num || str.length <= num) {
        return str;
      }
      return `${str.slice(0, num)}...`;
    },
  },
};
</script>

<style>
.top-part {
  height: 90%;
}
</style>
