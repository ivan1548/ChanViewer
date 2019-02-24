<template>
  <div class="row">
    <div class="col" v-bind:class="[viewerMedia ? 'col-sm-6' : 'col-sm-12']">
      <h6>{{op.subject}}</h6>
      <button class="button-small" @click="toggleAllReplies">{{allRepliesText}}</button>
      <template v-for="(post, index) in posts">
        <post-chain v-bind:key="index" :index="index" :post="post" :setReplies="allReplies"></post-chain>
      </template>
    </div>
    <div class="col col-sm-6" v-if="viewerMedia">
      <div class="postview">
        <div class="postview__container" v-bind:class="{ scrolled: scrolled }">
          <video
            v-if="viewerMedia.isVideo"
            ref="video"
            :src="viewerMedia.src"
            autoplay
            controls
            @click="togglePlay"
            @ended="next"
          ></video>
          <img v-else :src="viewerMedia.src">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { compose, take, drop, reverse, findIndex, isNil, head } from "rambda";

import { mapActions } from "vuex";

import ThreadModel from "../model/thread";

import Post from "./Post";
import PostChain from "./PostChain";

export default {
  name: "thread",
  components: { PostChain },
  data() {
    return {
      allReplies: false,
      scrolled: false,
      op: {},
      posts: [],
      media: [],
      videos: [],
      images: []
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path !== from.path) {
      this.load();
    }
    next();
  },
  mounted() {
    this.board = this.$route.params.board;
    this.thread = this.$route.params.id;
    this.setViewerMedia(null);
    this.load();

    window.addEventListener("scroll", e => {
      if (window.scrollY > 40) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    });

    document.addEventListener("keydown", event => {
      var tag = event.target.tagName.toLowerCase();
      if (tag != "input" && tag != "textarea") {
        switch (event.which) {
          case 188:
            // <
            event.preventDefault();
            this.prev();
            break;
          case 190:
            // >
            event.preventDefault();
            this.next();
            break;
          case 74:
            // J
            event.preventDefault();
            this.jump(-5);
            break;
          case 76:
            // L
            event.preventDefault();
            this.jump(5);
            break;
          case 37:
            // Left Arrow
            event.preventDefault();
            this.jump(-1);
            break;
          case 39:
            // Right Arrow
            event.preventDefault();
            this.jump(1);
            break;
          case 32:
          case 75:
            // Space Bar
            // K
            event.preventDefault();
            this.togglePlay();
            break;
          case 70:
            // F
            event.preventDefault();
            this.toggleFullScreen();
            break;
          case 80:
            // P
            event.preventDefault();
            this.setViewerMedia(null);
            break;
        }
      }
    });
  },
  updated() {
    const quotes = document.querySelectorAll(".quotelink");
    quotes.forEach(el => {
      el.addEventListener("click", () => {
        const id = drop(2, el.getAttribute("href"));
        const to = document.getElementById(id);
        to.scrollIntoView();
        // const clone = to.cloneNode();
      });
    });
  },
  methods: {
    load() {
      this.api.getThread(this.board, this.thread).then(posts => {
        console.log(posts);
        const thread = new ThreadModel(posts, this.board);
        this.posts = thread.sorted;
        this.files = thread.files;
        this.videos = thread.videos;
        this.images = thread.images;
        this.op = head(thread.sorted);
      });
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    next() {
      if (isNil(this.viewerMedia)) return;

      const index = this.videos.findIndex(v => {
        return v.id == this.viewerMedia.id;
      });

      if (index + 1 !== this.media.length) {
        const m = this.videos[index + 1];
        this.setViewerMedia(m);
      }
    },
    prev() {
      if (isNil(this.viewerMedia)) return;

      const index = this.videos.findIndex(v => {
        return v.id == this.viewerMedia.id;
      });

      if (index !== 0) {
        const m = this.videos[index - 1];
        this.setViewerMedia(m);
      }
    },
    togglePlay() {
      if (this.$refs.video.paused) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
    },
    jump(seconds) {
      this.$refs.video.currentTime += seconds;
    },
    toggleFullScreen() {
      if (document.webkitFullscreenElement !== null) {
        document.webkitExitFullscreen();
      } else {
        this.$refs.video.webkitRequestFullscreen();
      }
    },
    toggleAllReplies() {
      this.allReplies = !this.allReplies;
    },
    ...mapActions(["setViewerMedia"])
  },
  computed: {
    viewerMedia() {
      return this.$store.state.Viewer.media;
    },
    api() {
      return this.$store.state.Api.data;
    },
    allRepliesText() {
      return (this.allReplies ? "hide" : "show") + " all replies";
    }
  },
  watch: {
    viewerMedia(val, old) {
      if (!isNil(val)) {
        const el = document.getElementById(this.viewerMedia.no);
        el.scrollIntoView();
      }
    }
  }
};
</script>
