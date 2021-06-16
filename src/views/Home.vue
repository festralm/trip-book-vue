<template>
  <home-layout></home-layout>
</template>

<script>

import HomeLayout from "@/layouts/HomeLayout";
export default {
  name: 'Home',
  components: {
    HomeLayout
  },
  beforeMount() {
    this.$store.state.menuNotDriver = true;
    this.$store.state.menuDriver = false;
  }
}
</script>
