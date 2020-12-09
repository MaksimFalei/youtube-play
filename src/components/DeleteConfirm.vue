<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"> Are you sure? </v-card-title>
        <v-card-text>
          You are going to delete
          <span class="primary--text"><slot></slot></span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onCancel"> Cancel </v-btn>
          <v-btn color="primary darken-1" text @click="onOk"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DeleteConfirm",
  props: {
    value: Boolean,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    onOk() {
      this.dialog = false;
      this.$emit("ok");
    },
    onCancel() {
      this.dialog = false;
      this.$emit("cancel");
    },
  },
  watch: {
    value(v) {
      this.dialog = v;
    },
    dialog(v) {
      this.$emit("input", v);
    },
  },
};
</script>

<style>
</style>
