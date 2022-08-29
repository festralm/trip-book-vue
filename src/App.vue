<template>
  <div id="app">
    <menu-layout/>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap');
</style>
<script>
import MenuLayout from "./layouts/MenuLayout";

export default {
  components: {MenuLayout}
}
</script>
