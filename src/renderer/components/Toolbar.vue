<template>
  <nav class="main-nav">
    <div class="nav-container">
      <ul class="nav-links">
        <li>
          <a @click="toggleSidebar" class="toolbar-item" href="#">
            <i class="icon-bookshelf"></i>
          </a>
        </li>
        <li>
          <router-link to="/settings" class="toolbar-item">
            <i class="icon-settings"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/" class="toolbar-item">
            <i class="icon-home"></i>
          </router-link>
        </li>
        <li>
          <a class="toolbar-item" @click="$router.go(-1)" href="#">
            <i class="icon-arrow-left"></i>
          </a>
        </li>
        <li>
          <a class="tooltip toolbar-item" @click="refreshPage" href="#">
            <i class="icon-refresh"></i>
            <span class="tooltip-text tooltip-text__bottom">Clear ALL cache</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "toolbar",
  methods: {
    toggleSidebar() {
      this.$emit("togglesidebar");
    },
    refreshPage() {
      this.clearCache().then(() => {
        this.$router.push({
          path: this.$route.path,
          query: {
            t: +new Date(),
            refresh: true
          }
        });
      });
    },
    ...mapActions(["clearCache"])
  }
};
</script>
