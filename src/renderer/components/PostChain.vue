<template>
  <div>
    <post :post="post"></post>
    <div class="replies-wrapper">
      <button class="replies-button" v-if="post.replies.length > 0" @click="toggleReplies">
        <i :class="icon"></i>
        {{text}}({{post.getRepliesCount()}})
        <i :class="icon"></i>
      </button>
      <div class="replies" v-show="showReplies">
        <template v-for="(reply) in post.replies">
          <post-chain :setReplies="setReplies" v-bind:key="reply.no" :post="reply"></post-chain>
        </template>
      </div>
      <button
        class="replies-button"
        v-if="showReplies && post.replies.length > 0"
        @click="toggleReplies"
      >
        <i :class="icon"></i>
        {{text}}
        <i :class="icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { isNil } from "rambda";

import Post from "./Post";

export default {
  name: "post-chain",
  components: { Post },
  data() {
    return {
      showReplies: false
    };
  },
  props: {
    post: Object,
    index: Number,
    setReplies: {
      default: false,
      type: Boolean
    }
  },
  mounted() {
    this.showReplies = this.setReplies;
  },
  methods: {
    toggleReplies() {
      this.showReplies = !this.showReplies;
    }
  },
  computed: {
    text() {
      return (this.showReplies ? "hide" : "show") + " replies";
    },
    icon() {
      return this.showReplies ? "icon-arrow-down" : "icon-arrow-up";
    }
  },
  watch: {
    setReplies() {
      this.showReplies = this.setReplies;
    }
  }
};
</script>
