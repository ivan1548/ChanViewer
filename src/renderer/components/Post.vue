<template>
  <div :id="post.no" class="post" v-bind:class="{'has-replies': hasReplies}">
    <div class="post__head">
      <b>{{post.name}}</b>
      <em>No:{{post.no}}</em>
      <b v-if="post.subject" class="subject">: {{post.subject}}</b>
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
      <template v-for="(file, index) in post.files">
        <em v-bind:key="`fn${index}${file.no}`" v-if="file.filename">File: {{file.file}}</em>,
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
