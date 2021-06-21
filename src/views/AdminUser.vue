<template>
  <profile v-bind:is-admin="true" ></profile>
</template>

<script>
import router from "@/router";
import Profile from "../components/Profile";
export default {
  name: "AdminUser",
  data() {
    return {
      user: {}
    }
  },
  components: {Profile},
  async beforeMount() {
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
