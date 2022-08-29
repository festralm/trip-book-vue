<template>
  <div class="admin-wrapper ">
    <admin-search/>
    <users-for-admin></users-for-admin>
  </div>
</template>

<script>
import AdminSearch from "../layouts/AdminSearch";
import UsersForAdmin from "@/layouts/UsersForAdmin";
export default {
  name: "Admin",
  components: {UsersForAdmin, AdminSearch},
}
</script>

<style scoped>

</style>
