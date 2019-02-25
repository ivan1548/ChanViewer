<template>
  <div class="row">
    <div v-if="page" class="col col-sm-12">
      <pagination :pages="pages" :currentIndex="pageIndex" @changepage="changePage"></pagination>
      <div v-for="thread in page.threads" v-bind:key="thread.no">
        <div class="thread-head">
          <router-link :to="`/thread/${board}/${thread.no}`">{{thread.no}}</router-link>
          <em>Replies: {{thread.post_count}}</em> |
          <em>Files: {{thread.file_count}}</em>
          <div class="thread-head__actions">
            <button class="button-tiny button-info" @click="goToThread(thread)">Open</button>
            <button class="button-tiny" @click="addBookshelfItem(thread)">
              <i class="icon-favorite"></i>
            </button>
          </div>
        </div>
        <post :post="thread"></post>
      </div>
      <pagination :pages="pages" :currentIndex="pageIndex" @changepage="changePage"></pagination>
    </div>
  </div>
</template>

<script>
import { isNil } from "rambda";
import { mapActions } from "vuex";

import { getBoard } from "../helper/cache";

import PostModel from "../model/post";

import Post from "./Post";
import Pagination from "./Pagination";

export default {
  name: "board",
  components: { Post, Pagination },
  data() {
    return {
      board: false,
      pages: [],
      pageIndex: 1
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path !== from.path || !isNil(to.query.refresh)) {
      this.init();
    }
    next();
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.board = this.$route.params.id;
      this.pageIndex = this.$route.params.page;
      this.load(this.$route.params.id);
    },
    load(id) {
      getBoard(id).then(pages => {
        this.pages = pages;
      });
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    goToThread(thread) {
      this.$router.push(`/thread/${this.board}/${thread.no}`);
    },
    changePage(index) {
      this.pageIndex = index;
    },
    ...mapActions(["addBookshelfItem"])
  },
  computed: {
    page() {
      return this.pages[this.pageIndex - 1];
    },
    api() {
      return this.$store.state.Api.data;
    }
  }
};
</script>
