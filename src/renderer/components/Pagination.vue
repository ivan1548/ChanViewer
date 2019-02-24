<template>
  <ul class="pagination">
    <li v-if="showPrev">
      <a @click="prevPage()" href="#">
        <i class="icon-arrow-left"></i>
      </a>
    </li>
    <li v-for="(p, index) in pages" v-bind:key="index">
      <a v-bind:class="{ active: isActive(p)}" @click="changePage(p.page)" href="#">{{p.page}}</a>
    </li>
    <li v-if="showNext">
      <a @click="nextPage()" href="#">
        <i class="icon-arrow-right"></i>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {};
  },
  props: {
    pages: Array,
    currentIndex: [Number, String]
  },
  methods: {
    changePage(index) {
      this.$emit("changepage", index);
    },
    nextPage() {
      this.changePage(+this.currentIndex + 1);
    },
    prevPage() {
      this.changePage(+this.currentIndex - 1);
    },
    isActive(page) {
      return page.page == this.currentIndex;
    }
  },
  computed: {
    showPrev() {
      return this.currentIndex != 1;
    },
    showNext() {
      return this.currentIndex != this.pages.length;
    }
  }
};
</script>
