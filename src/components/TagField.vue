<template>
  <v-container fluid>
    <v-combobox
      v-model="model"
      v-label="$t('tagField.label')"
      multiple
      small-chips
      dark
      append-icon
      outline
      color="primary"
    >
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip v-bind="attrs" dark :input-value="selected" label small>
          <span class="pr-2">
            {{ item }}
          </span>
          <v-icon small @click="parent.selectItem(item)"> mdi-close </v-icon>
        </v-chip>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
export default {
  name: "TagField",
  data: () => ({
    model: [],
  }),
  props: {
    value: Array,
  },
  watch: {
    value(v) {
      this.model = v;
    },
    model(v) {
      this.$emit("input", v);
    },
  },
};
</script>

<style>
</style>
