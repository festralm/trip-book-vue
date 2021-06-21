<template>
<profile v-bind:is-admin="false" v-bind:id="id"></profile>
</template>

<script>
import Profile from "../components/Profile";
import router from "../router";
export default {
  name: "UsersProfile",
  components: {Profile},
  data() {
    return {
      id: router.currentRoute.params['id'],
    }
  }
}
</script>

<style scoped>

</style>
