<template>
  <div v-if="step === 0">
    <zero-step0 @next="incrementStep()"></zero-step0>
  </div>
  <div  v-else-if="step === 1">
    <with-driver2 @next="incrementStep()" @back="decrementStep()"></with-driver2>
  </div>
  <div  v-else-if="step === 2">
    <brand3 @next="incrementStep()" @back="decrementStep()"></brand3>
  </div>
  <div v-else-if="step === 3">
    <model4 @next="incrementStep()" @back="decrementStep()"></model4>
  </div>
  <div v-else-if="step === 4">
    <address5 @next="incrementStep()" @back="decrementStep()"></address5>
  </div>
  <div v-else-if="step === 5">
    <name6 @next="incrementStep()" @back="decrementStep()"></name6>
  </div>
  <div  v-else-if="step === 6">
    <price7 @next="incrementStep()" @back="decrementStep()"></price7>
  </div>
  <div v-else-if="step === 7">
    <description8  @next="incrementStep()" @back="decrementStep()"></description8>
  </div>
  <div v-else-if="step === 8">
    <dates9  @next="incrementStep()" @back="decrementStep()"></dates9>
  </div>
  <div  v-else-if="step === 9">
    <photos10  @next="incrementStep()" @back="decrementStep()"></photos10>
  </div>
  <div  v-else-if="step === 10">
    <final ></final>
  </div>
  <!--  todo location-->
</template>

<script>
import ZeroStep0 from "@/layouts/create_transport/ZeroStep0";
import WithDriver2 from "@/layouts/create_transport/WithDriver2";
import Brand3 from "@/layouts/create_transport/Brand3";
import Model4 from "@/layouts/create_transport/Model4";
import Address5 from "@/layouts/create_transport/Address5";
import Final from "@/layouts/create_transport/Final";
import Name6 from "@/layouts/create_transport/Name6";
import Price7 from "@/layouts/create_transport/Price7";
import Description8 from "@/layouts/create_transport/Description8";
import Dates9 from "@/layouts/create_transport/Dates9";
import Photos10 from "@/layouts/create_transport/Photos10";
import router from "../../router";
export default {
  name: "RentTransportLayout",
  components: {
    Photos10,
    Dates9,
    Description8,
    Price7,
    Name6,
    Final,
    Address5, Model4, Brand3, WithDriver2, ZeroStep0},
  data() {
    return {
      step: 0,
    }
  },
  methods: {
    incrementStep() {
      this.step++;
      if (this.step === 10) {
        this.createTransport()
      }
    },
    decrementStep() {
      this.step--;
    },
    getNormalDate(date, start) {
      if (start) {
        var hour = 0;
        var minute = 0;
        var second = 0;
        var ms = 0;
      } else {
        hour = 23;
        minute = 59;
        second = 59;
        ms = 999;
      }
      if (this.$store.state.transportForm.forHour) {
        hour = date.getHours();
      }
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
          hour, minute, second, ms).getTime()
    },
    async createTransport() {
      this.$store.state.transportForm.start =
          this.getNormalDate(new Date(this.$store.state.transportForm.range.start), true)
      this.$store.state.transportForm.finish =
          this.getNormalDate(new Date(this.$store.state.transportForm.range.end), false)
      const request = new Request(
          "http://localhost/car/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.$store.state.transportForm),
          }
      );

      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      var response = await fetch(request);
      if (response.status !== 200) {
        await router.push("/error/default")
      }
    }
  },
  beforeMount() {
    if (this.$store.state.authorised !== 'true') {
      router.push("sign-in");
    }
    this.$store.state.fixed = false;
  }
}
</script>

<style scoped>
</style>
