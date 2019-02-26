<template>
  <ul class="pagination">
    <li v-if="showPrev">
      <a @click="prevPage()" href="#">
        <i class="icon-arrow-left"></i>
      </a>
    </li>
    <li v-for="(p, index) in pages" v-bind:key="index">
      <a
        v-bind:class="{ active: isActive(p)}"
        @click="changePage(p.pageNumber)"
        href="#"
      >{{p.pageNumber}}</a>
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
    currentPage: [Number, String]
  },
  methods: {
    changePage(pageNumber) {
      this.$emit("changepage", pageNumber);
    },
    nextPage() {
      console.log(this.currentPage);
      this.changePage(+this.currentPage + 1);
    },
    prevPage() {
      this.changePage(+this.currentPage - 1);
    },
    isActive(page) {
      return page.pageNumber == this.currentPage;
    }
  },
  computed: {
    showPrev() {
      return this.currentPage != 1;
    },
    showNext() {
      return this.currentPage != this.pages.length;
    }
  }
};
</script>
