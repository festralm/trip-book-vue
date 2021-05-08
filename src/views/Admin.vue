<template>
<div class="admin-wrapper">
  <a href="/admin/users">Список всех пользователей</a>
  <admin-search/>
</div>
</template>

<script>
import AdminSearch from "../layouts/AdminSearch";
export default {
  name: "Admin",
  components: {AdminSearch}
}
</script>

<style scoped>

</style>
