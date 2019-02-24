<template>
  <nav class="main-nav">
    <div class="nav-container">
      <ul class="nav-links">
        <li>
          <router-link to="/settings">
            <i class="icon-settings"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <i class="icon-home"></i>
          </router-link>
        </li>
        <li>
          <a @click="$router.go(-1)" href="#">
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
