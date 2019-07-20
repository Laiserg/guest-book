<template>
  <div id="home-page">
    <h1 class="title">Гостевая книга</h1>
    <Navigation />
  </div>
</template>

<script>

import Navigation from '@/components/Navigation.vue'

export default {
  name: 'home-page',
  components: {
    Navigation
  },
  data() {
      return {
          
      }
  }
}
</script>

<style lang="scss" scoped>

@import './src/css-parts/_variables.scss';

#home-page {
  margin: 40px auto;
}


</style>