<template>
  <div class="row">
    <div class="col col-sm-12">
      <div class="form-control">
        <input v-model="filterInput" type="text" placeholder="Filter">
      </div>
      <div class="thread-list">
        <div v-for="b in filtered" v-bind:key="b.id">
          <router-link :to="`/board/${b.id}/1`">
            {{b.name}}
            <span v-if="b.nsfw">(NSFW)</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { map, filter, includes } from "rambda";

import { getBoards } from "../helper/cache";

import BoardModel from "../model/board";

export default {
  name: "landing-page",
  components: {},
  data() {
    return {
      boards: [],
      filterInput: ""
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.load();
    next();
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      getBoards().then(boards => {
        this.boards = boards;
      });
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  },
  computed: {
    api() {
      return this.$store.state.Api.data;
    },
    filtered() {
      if (this.filterInput === "") return this.boards;

      const f = this.filterInput;
      return filter(b => {
        return includes(f, b.name.toLowerCase()) || includes(f, b.id);
      })(this.boards);
    }
  }
};
</script>
