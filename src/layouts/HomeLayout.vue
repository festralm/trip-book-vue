<template>
  <background-layout ></background-layout>
</template>

<script>
import BackgroundLayout from "@/layouts/BackgroundLayout";
export default {
  name: "HomeLayout",
  components: {BackgroundLayout},
  data() {
  },
  async mounted() {
    var request = new Request(
        "http://localhost/",
        {
          method: "GET",
        }
    );
    if (this.$store.state.token !== '') {
      request.headers.append("Authorization", this.$store.state.token);
    }
    var response = await fetch(request);

    response.json().then(data => {
      if (data['statusNumber'] === 3) {
        if (this.$store.state.token !== '') {
          localStorage.removeItem('token');
        }
        this.$store.state.authorised = false;
      } else {
        this.$store.state.authorised = true;
      }
    })
    this.$forceUpdate()
  }
}
</script>

<style>

</style>
