<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title> {{$t('dialog.title')}} </v-card-title>
      <v-card-text>
        <v-select
          :items="options"
          v-label="$t('dialog.label')"
          item-value="value"
          autofocus
          v-model="selected"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="onClose"> {{$t('actions.close')}} </v-btn>
        <v-btn color="success" text @click="onSave"> {{$t('actions.save')}} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "VideoDialog",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      dialog: false,
      selected: null,
    };
  },
  watch: {
    value(v) {
      this.dialog = v;
    },
    dialog(v) {
      this.$emit("input", v);
    },
  },
  methods: {
    onSave() {
      this.$emit("save", this.selected);
      this.dialog = false;
      this.selected = null;
    },
    onClose() {
      this.dialog = false;
      this.selected = null;
      this.$emit("cancel", this.selected);
    },
  },
};
</script>

<style>
</style>
