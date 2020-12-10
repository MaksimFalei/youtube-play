<template>
  <div class="d-flex flex-column align-center">
    <h1>{{ $t('app.description.header') }}</h1>
    <div>
      <h3>{{ $t('app.description.subHeader') }}</h3>
      <ul>
        <li>{{ $t('app.description.case1') }}</li>
        <li>{{ $t('app.description.case2') }}</li>
        <!-- <li>remove videos from the playlist.</li> -->
        <!-- <li>change the video order in the playlist.</li> -->
        <li>{{ $t('app.description.case5') }}</li>
        <li>{{ $t('app.description.case6') }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
