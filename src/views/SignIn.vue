<template>
    <sign-in-form @updateMenu="$emit('updateMenu')" />
</template>

<script>
import SignInForm from "../components/SignInForm";
import router from "@/router";
export default {
  name: "SignIn",
  components: { SignInForm},
  methods: {
  }
}
</script>

<style scoped>
</style>
