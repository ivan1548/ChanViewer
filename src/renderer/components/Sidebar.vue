<template>
  <div class="bookshelf sidebar sidebar-left">
    <h6 class="sidebar-category">Threads</h6>
    <ul class="sidebar-links">
      <li v-for="thread in threads" v-bind:key="thread.no">
        <router-link :to="`/thread/${thread.board}/${thread.no}`">
          <div v-if="thread.subject">{{thread.subject}}</div>
          <div>{{thread.no}}</div>
        </router-link>

        <button @click="removeBookshelfItem(thread)" class="button-tiny delete">
          <i class="icon-close"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "sidebbar",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["clearBookshelf", "removeBookshelfItem"])
  },
  computed: {
    threads() {
      return this.$store.state.Bookshelf.threads;
    }
  }
};
</script>
