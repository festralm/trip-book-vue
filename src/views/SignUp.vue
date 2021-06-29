<template>
<sign-up-form  @updateMenu="$emit('updateMenu')" />
</template>

<script>
import SignUpForm from "../components/SignUpForm";
export default {
  name: "SignUp",
  components: {SignUpForm}
}
</script>

<style scoped>

</style>
