<template>

  <profile v-bind:is-admin="false" v-bind:id="null"></profile>
</template>

<script>
import Profile from "../components/Profile";
export default {
  name: "MyProfile",
  components: {Profile}
}
</script>

<style scoped>

</style>
