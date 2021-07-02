<template>
  <profile v-bind:id="null" @updateMenu="$emit('updateMenu')"></profile>
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
