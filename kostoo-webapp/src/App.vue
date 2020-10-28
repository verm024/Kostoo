<template>
  <div id="app">
    <div class="view">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {
    $route: {
      handler: (to, from) => {
        document.title = to.name ? to.name + " - Kostoo" : "Kostoo";
      },
      immediate: true
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800&display=swap");

body {
  margin: 0;
  font-family: "Nunito Sans", sans-serif;
  overflow-x: hidden;
}
</style>
