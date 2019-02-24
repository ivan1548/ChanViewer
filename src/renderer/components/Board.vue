<template>
  <div class="row">
    <div v-if="page" class="col col-sm-12">
      <pagination :pages="pages" :currentIndex="pageIndex" @changepage="changePage"></pagination>
      <div v-for="thread in page.threads" v-bind:key="getThreadId(thread)">
        <div class="thread-head">
          <router-link :to="`/thread/${board}/${getThreadId(thread)}`">{{getThreadId(thread)}}</router-link>
          <em>Replies: {{thread.replies}}</em> |
          <em>Images: {{thread.images}}</em>
        </div>
        <post @click.native="goToThread(thread)" :post="getPost(thread)"></post>
      </div>
      <pagination :pages="pages" :currentIndex="pageIndex" @changepage="changePage"></pagination>
    </div>
  </div>
</template>

<script>
import { isNil } from "rambda";

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
  created() {
    this.board = this.$route.params.id;
    this.pageIndex = this.$route.params.page;
    this.load(this.$route.params.id);
  },
  methods: {
    load(id) {
      this.api.getBoard(id).then(pages => {
        this.pages = pages;
      });
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    getPost(thread) {
      return new PostModel(thread, this.board);
    },
    goToThread(thread) {
      this.$router.push(`/thread/${this.board}/${this.getThreadId(thread)}`);
    },
    changePage(index) {
      this.pageIndex = index;
    },
    getThreadId(thread) {
      return isNil(thread.no) ? thread.num : thread.no;
    }
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
