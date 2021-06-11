<template>
  <div>
    <transport-search></transport-search>
    <transports></transports>
    <router-view></router-view>
  </div>
</template>

<script>
import TransportSearch from "@/layouts/TransportSearch";
import Transports from "@/layouts/Transports";
export default {
  name: "HomeLayout",
  components: {Transports, TransportSearch},
  methods: {
  },
}
</script>

<style>

</style>
