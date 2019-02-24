<template>
  <div class="row">
    <div class="col col-sm-12">
      <div class="form-control">
        <label>Default API</label>
        <select v-model="apiModel" @change="saveApi">
          <option v-for="(api) in apis" v-bind:key="api.name" :value="api">{{api.name}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { isNil, values } from "rambda";

import { mapActions } from "vuex";

import { availableApis } from "../helper/api";
import { update } from "../helper/settings";

export default {
  name: "settings",
  components: {},
  data() {
    return {
      apis: [],
      apiModel: false
    };
  },
  created() {
    console.log(availableApis);
    this.apis = values(availableApis);
    this.apiModel = this.api;
  },
  methods: {
    saveApi() {
      update("api", this.apiModel.name).then(_ => {
        this.setApi(this.apiModel);
      });
    },
    ...mapActions(["setApi"])
  },
  computed: {
    api() {
      return this.$store.state.Api.data;
    },
    settings() {
      return this.$store.state.Settings;
    }
  }
};
</script>
