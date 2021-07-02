<template>

  <div class="admin-wrapper ">
    <admin-search-cars/>
    <cars-for-admin></cars-for-admin>
  </div>
</template>

<script>
import AdminSearchCars from "../layouts/AdminSearchCars";
import CarsForAdmin from "../layouts/CarsForAdmin";
export default {
  name: "AdminCars",
  components: {CarsForAdmin, AdminSearchCars}
}
</script>

<style scoped>

</style>
