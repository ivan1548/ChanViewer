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

import { getThread } from "../helper/cache";

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
    if (to.path !== from.path || !isNil(to.query.refresh)) {
      next();
      this.init();
    } else {
      next();
    }
  },
  destroyed() {
    document.removeEventListener("keydown", this.keydownEvents);
    window.removeEventListener("scroll", this.scrollEvent);
  },
  mounted() {
    this.init();

    window.addEventListener("scroll", this.scrollEvent);
    document.addEventListener("keydown", this.keydownEvents);
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
    init() {
      this.board = this.$route.params.board;
      this.thread = this.$route.params.id;
      this.setViewerMedia(null);
      this.load();
    },
    load() {
      const api = this.$route.query.api;
      getThread(this.board, this.thread, api).then(thread => {
        this.posts = thread.sorted;
        this.files = thread.files;
        this.videos = thread.videos;
        this.images = thread.images;
        this.op = head(thread.sorted);
      });
    },
    keydownEvents(event) {
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
    },
    scrollEvent(event) {
      if (window.scrollY > 40) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    next() {
      if (isNil(this.viewerMedia)) return;

      const index = this.videos.findIndex(v => {
        return v.id == this.viewerMedia.id;
      });

      console.log(index, "next");

      if (index !== -1 && index + 1 !== this.videos.length) {
        const m = this.videos[index + 1];
        this.setViewerMedia(m);
      }
    },
    prev() {
      if (isNil(this.viewerMedia)) return;

      const index = this.videos.findIndex(v => {
        return v.id == this.viewerMedia.id;
      });

      console.log(index, "prev");

      if (index !== -1 && index !== 0) {
        const m = this.videos[index - 1];
        this.setViewerMedia(m);
      }
    },
    togglePlay() {
      if (isNil(this.$refs.video)) return;

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
        if (el) el.scrollIntoView();
      }
    }
  }
};
</script>
