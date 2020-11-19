<template>
  <div id="app">
    <Navigation />
    <transition>
      <router-view id="view" />
    </transition>
    <Footer />
  </div>
</template>

<script>
import Navigation from "./views/Menu";
import Footer from "./views/Footer";

export default {
  components: {
    Navigation,
    Footer
  },
  methods: {},
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
      document.title = this.$route.meta.title;
    }
  },
  created() {
    document.title = this.$route.meta.title;
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Ubuntu", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  min-width: 90vw;
  min-height: 100vh;
  background-color: #c9caca;
  box-sizing: 0;
  outline: none;
}

#view {
  min-height: 80vh;
}
</style>
