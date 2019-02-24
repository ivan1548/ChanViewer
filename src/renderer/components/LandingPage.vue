<template>
  <div class="row">
    <div class="col col-sm-12">
      <div class="thread-list">
        <div v-for="b in boards" v-bind:key="b.id">
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
import { map } from "rambda";

import { getBoards } from "../helper/cache";

import BoardModel from "../model/board";

export default {
  name: "landing-page",
  components: {},
  data() {
    return {
      boards: []
    };
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
    }
  }
};
</script>
