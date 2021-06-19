<template>
  <div class="my-image">
    <b-container class=" mt-3">
      <b-row class=" justify-content-center auth-layout">
        <b-col lg="4">
          <router-view  @updateMenu="$emit('updateMenu')" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  methods: {

  }
}
</script>

<style>
.auth-layout {
}
.sign-in {
  margin-top: 100px;
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

.my-image {
  top: 0;
  left: 0;
  width: 100%;
  background: url("../assets/background.jpg") no-repeat;
  background-size: cover;
  margin-top: 70px;
  height: 651px;
}
</style>
