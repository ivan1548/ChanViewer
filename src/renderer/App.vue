<template>
  <div id="app">
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
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "chan-viewer"
};
</script>

<style>
/* CSS */
</style>
