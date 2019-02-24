<template>
  <div id="app">
    <toolbar></toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar";

export default {
  name: "chan-viewer",
  components: { Toolbar }
};
</script>

<style>
/* CSS */
</style>
