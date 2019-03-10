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
      <ul class="nav-links">
        <li>
          <select v-model="apiModel" @change="saveApi">
            <option v-for="(api) in apis" v-bind:key="api.name" :value="api">{{api.name}}</option>
          </select>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { isNil, values } from "rambda";

import { mapActions } from "vuex";

import { availableApis } from "../helper/api";

export default {
  name: "toolbar",
  data() {
    return {
      apis: [],
      apiModel: false
    };
  },
  created() {
    this.apis = values(availableApis);
    this.apiModel = this.api;
  },
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
    saveApi() {
      this.setApi(this.apiModel).then(_ => {
        this.$router.push("/");
      });
    },
    ...mapActions(["clearCache", "setApi"])
  },
  computed: {
    api() {
      return this.$store.state.Api.data;
    },
    settings() {
      return this.$store.state.Settings;
    }
  }
};
</script>
