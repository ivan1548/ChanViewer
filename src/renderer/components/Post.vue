<template>
  <div :id="post.no" class="post" v-bind:class="{'has-replies': hasReplies}">
    <div class="post__head">
      <b>{{post.name}}</b>
      <em>No:{{post.no}}</em>
      <b v-if="post.subject" class="subject">
        <span v-html="post.subject">{{post.subject}}</span>
      </b>
    </div>
    <div class="post__body">
      <div class="thumbnail" v-bind:class="{multiple: multipleMedia}">
        <template v-for="(file, index) in post.files">
          <img
            @click="setViewerMedia(file)"
            v-bind:key="`f${index}${file.no}`"
            :width="file.thumbnail.width"
            :height="file.thumbnail.height"
            :src="file.thumbnail.src"
          >
        </template>
      </div>
      <div class="content" v-html="post.message"></div>
    </div>
    <div class="post__footer">
      <em>{{post.date}}</em> |
      <em v-if="post.files.length">Files:
        <template v-for="(file, index) in post.files">
          <span v-bind:key="`fn${index}${file.no}`">{{getFileName(file)}}</span>
        </template>
      </em>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import { last } from "rambda";

export default {
  name: "post",
  components: {},
  data() {
    return {};
  },
  props: {
    post: Object
  },
  mounted() {},
  methods: {
    getFileName(file) {
      return (
        `${file.file} [${file.size}]` +
        (last(this.post.files).file === file.file ? "" : ", ")
      );
    },
    ...mapActions(["setViewerMedia"])
  },
  computed: {
    api() {
      return this.$store.state.Api.data;
    },
    hasReplies() {
      return this.post.replies.length > 0;
    },
    multipleMedia() {
      return this.post.files;
    }
  }
};
</script>
