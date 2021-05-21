<template>
  <b-container class="mt-5">
    <b-row class="justify-content-center auth-layout">
      <b-col lg="4">
        <router-view />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "AuthLayout"
}
</script>

<style>
.auth-layout {
}
.sign-in {
  border-radius: 4%;
  background-color: white;
}
.errors {
color: red;
}

.google {
  flex: 0 1 0 !important;
  width: 20px;
  float: left;
}
</style>
