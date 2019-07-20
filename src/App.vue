<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import HomePage from './view/HomePage.vue'

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">

@import './src/css-parts/_variables.scss';

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html, body {
  scroll-behavior: smooth;
}

.title {
    text-align: center;
    font-family: $fontFamilyForTitle;
    margin: 0 0 20px 0;
    color: $colorForTitles;
}

.title-h2 {
    text-align: left;
    font-family: $fontFamilyForTitle;
    margin: 60px 0 20px 0;
    color: $colorForTitles;
}

.title-h3 {
    text-align: left;
    font-family: $fontFamilyForTitle;
    margin: 30px 0 16px 0;
    color: $colorForTitles;
}

.btn {
  border-radius: 50px;
  cursor: pointer;
}

</style>
