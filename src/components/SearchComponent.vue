<template>
  <v-toolbar light>
    <v-text-field
      class="mx-4"
      flat
      hide-details
      prepend-inner-icon="mdi-magnify"
      solo-inverted
      clearable
      v-model="internalValue"
      @input="!searchButton ? onSearch() : null"
      @click:clear="onClear"
    >
      <template v-slot:label>
        {{ $t('actions.search') }}
      </template>
    </v-text-field>
    <v-btn v-if="searchButton" dark @click="onSearch">{{
      $t("actions.search")
    }}</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "SearcComponent",
  props: {
    value: String,
    searchButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      internalValue: "",
    };
  },
  watch: {
    value(v) {
      this.internalValue = v;
    },
  },
  methods: {
    onSearch() {
      this.$emit("input", this.internalValue);
    },
    onClear() {
      this.$emit("input", "");
    },
  },
};
</script>

<style>
</style>
