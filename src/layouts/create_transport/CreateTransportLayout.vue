<template>
  <div v-if="step === 0">
    <zero-step0 @next="incrementStep()"></zero-step0>
  </div>
  <div v-else-if="step === 1">
    <type1 @next="incrementStep()" @back="decrementStep()"></type1>
  </div>
  <div v-else-if="step === 2">
    <with-driver2 :type="type" @next="incrementStep()" @back="decrementStep()"></with-driver2>
  </div>
  <div v-else-if="step === 3">
    <brand3 :type="type" @next="incrementStep()" @back="decrementStep()"></brand3>
  </div>
  <div v-else-if="step === 4">
    <model4 @next="incrementStep()" @back="decrementStep()"></model4>
  </div>
  <div v-else-if="step === 5">
    <address5 @next="incrementStep()" @back="decrementStep()"></address5>
  </div>
  <div v-else-if="step === 6">
    <name6 @next="incrementStep()" @back="decrementStep()"></name6>
  </div>
  <div v-else-if="step === 7">
    <price7 @next="incrementStep()" @back="decrementStep()"></price7>
  </div>
  <div v-else-if="step === 8">
    <description8  @next="incrementStep()" @back="decrementStep()"></description8>
  </div>
  <div v-else-if="step === 9">
    <dates9  @next="incrementStep()" @back="decrementStep()"></dates9>
  </div>
  <div v-else-if="step === 10">
    <photos10  @next="incrementStep()" @back="decrementStep()"></photos10>
  </div>
  <div v-else-if="step === 11">
    <final ></final>
  </div>
  <!--    todo not authorized error page or redirect-->
<!--  todo images, location-->
</template>

<script>
import ZeroStep0 from "@/layouts/create_transport/ZeroStep0";
import Type1 from "@/layouts/create_transport/Type1";
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
export default {
  name: "RentTransportLayout",
  components: {
    Photos10,
    Dates9,
    Description8,
    Price7,
    Name6,
    Final,
    Address5, Model4, Brand3, WithDriver2, Type1, ZeroStep0},
  data() {
    return {
      step: 0,
      type: 1,
    }
  },
  methods: {
    incrementStep() {
      this.step++;
      if (this.step === 11) {
        this.createTransport()
      }
    },
    decrementStep() {
      this.step--;
    },
    async createTransport() {
      const request = new Request(
          "http://localhost/transports/create",
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

      console.log(response)
    }
  },
  beforeMount() {

  }
}
</script>

<style scoped>

</style>
