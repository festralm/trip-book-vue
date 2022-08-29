<template>
  <div class="search">
    <form action="/search" method="post">
      Поиск
      <input placeholder="id" name="id" type="text">
      <input placeholder="email" name="email" type="email">
      <input type="submit" value="Искать">
    </form>
  </div>
</template>

<script>
export default {
  name: "AdminSearch"
}
</script>

<style scoped>

</style>
