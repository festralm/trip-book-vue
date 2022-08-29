<template>
  <div id="app">
    <menu-layout/>
    <router-view/>
  </div>
</template>

<style>
</style>
<script>
import MenuLayout from "./layouts/MenuLayout";
export default {
  components: {MenuLayout}
}
</script>
