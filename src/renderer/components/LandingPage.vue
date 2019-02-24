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
import BoardModel from "../model/board";
import { map } from "rambda";

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
      this.api.getBoards().then(boards => {
        this.boards = map(b => {
          return new BoardModel(b);
        })(boards);
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
