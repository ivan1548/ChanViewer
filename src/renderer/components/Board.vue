<template>
  <div class="row">
    <div class="col col-sm-12">
      <div class="form-control">
        <input v-model="filterInput" type="text" placeholder="Filter">
      </div>
    </div>
    <div v-if="page" class="col col-sm-12">
      <pagination :pages="pages" :currentPage="currentPage" @changepage="changePage"></pagination>
      <div v-for="thread in page.threads" v-bind:key="thread.no">
        <div class="thread-head">
          <router-link :to="`/thread/${board}/${thread.no}`">{{thread.no}}</router-link>
          <em>Replies: {{thread.post_count}}</em> |
          <em>Files: {{thread.file_count}}</em>
          <div class="thread-head__actions">
            <button class="button-tiny button-info" @click="goToThread(thread)">Open</button>
            <button class="button-tiny button-info" @click="addBookshelfItem(thread)">
              <i class="icon-favorite"></i>
            </button>
          </div>
        </div>
        <post :post="thread"></post>
      </div>
      <pagination :pages="pages" :currentPage="currentPage" @changepage="changePage"></pagination>
    </div>
  </div>
</template>

<script>
import { isNil, compose, map, splitEvery, filter, includes } from "rambda";
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
      currentPage: 1,
      threads: [],
      filterInput: ""
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path !== from.path || !isNil(to.query.refresh)) {
      next();
      this.init();
    } else {
      next();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.board = this.$route.params.id;
      this.currentPage = this.$route.params.page;
      this.load(this.$route.params.id);
    },
    load(id) {
      getBoard(id).then(threads => {
        this.threads = threads;
      });
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    goToThread(thread) {
      this.$router.push(`/thread/${this.board}/${thread.no}`);
    },
    changePage(index) {
      this.currentPage = index;
    },
    ...mapActions(["addBookshelfItem"])
  },
  computed: {
    filteredThreads() {
      if (this.filterInput === "") return this.threads;

      const f = this.filterInput;
      return filter(t => {
        if (isNil(t.message)) console.log(t);

        return includes(f, t.message.toLowerCase()) || includes(f, t.subject);
      })(this.threads);
    },
    pages() {
      return compose(
        map((threads, index) => {
          return {
            pageNumber: index + 1,
            threads: threads
          };
        }),
        splitEvery(20)
      )(this.filteredThreads);
    },
    page() {
      return this.pages[this.currentPage - 1];
    },
    api() {
      return this.$store.state.Api.data;
    }
  }
};
</script>
