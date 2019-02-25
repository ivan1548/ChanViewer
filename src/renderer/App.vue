<template>
  <div id="app">
    <div class="row">
      <toolbar @togglesidebar="toggleSidebar"></toolbar>
      <div v-if="sidebar" class="col col-sm-2">
        <sidebar></sidebar>
      </div>
      <div class="col" v-bind:class="[sidebar ? 'col-sm-10' : 'col-sm-12']">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";

export default {
  name: "chan-viewer",
  data() {
    return {
      sidebar: false
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    }
  },
  components: { Toolbar, Sidebar }
};
</script>

<style>
/* CSS */
</style>
