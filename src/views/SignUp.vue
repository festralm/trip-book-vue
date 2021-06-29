<template>
<sign-up-form  @updateMenu="$emit('updateMenu($event,userDefined)')" />
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
