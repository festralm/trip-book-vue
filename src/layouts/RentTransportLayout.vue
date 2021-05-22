<template>
  <div v-if="step === 0">
    <zero-step-layout @next="incrementStep()"></zero-step-layout>
  </div>
  <div v-else-if="step === 1">
    <first-step-layout @chosen="typeChosen" @next="incrementStep()" @back="decrementStep()"></first-step-layout>
  </div>
  <div v-else-if="step === 2">
    <second-step-layout @chosen="driverChosen" :type="type" @next="incrementStep()" @back="decrementStep()"></second-step-layout>
  </div>
  <div v-else-if="step === 3">
    <third-step-layout @chosen="brandChosen" :type="type" @next="incrementStep()" @back="decrementStep()"></third-step-layout>
  </div>
  <div v-else-if="step === 4">
    <forth-step-layout  @chosen="modelChosen" :brand="form.brand"  @next="incrementStep()" @back="decrementStep()"></forth-step-layout>
  </div>
  <div v-else-if="step === 5">
    <fifth-step-layout  @chosen="modelChosen" :brand="form.brand"  @next="incrementStep()" @back="decrementStep()"></fifth-step-layout>
  </div>
  <div v-else-if="step === 6">
    <final-step-layout ></final-step-layout>
  </div>
</template>

<script>
import ZeroStepLayout from "@/layouts/ZeroStepLayout";
import FirstStepLayout from "@/layouts/FirstStepLayout";
import SecondStepLayout from "@/layouts/SecondStepLayout";
import ThirdStepLayout from "@/layouts/ThirdStepLayout";
import ForthStepLayout from "@/layouts/ForthStepLayout";
import FifthStepLayout from "@/layouts/FifthStepLayout";
import FinalStepLayout from "@/layouts/FinalStepLayout";
import router from "@/router";
export default {
  name: "RentTransportLayout",
  components: {
    FinalStepLayout,
    FifthStepLayout, ForthStepLayout, ThirdStepLayout, SecondStepLayout, FirstStepLayout, ZeroStepLayout},
  data() {
    return {
      step: 0,
      type: 1,
      form: {
        withDriver: true,
        brand: '',
        model: ''
      }
    }
  },
  methods: {
    incrementStep() {
      this.step++;
      if (this.step === 6) {
        this.createTransport()
      }
    },
    decrementStep() {
      this.step--;
    },
    typeChosen(num) {
      this.type = num;
    },
    driverChosen(num) {
      if (num === 1) {
        this.form.withDriver = true
      } else {
        this.form.withDriver = false;
      }
    },
    brandChosen(brand) {
      this.form.brand = brand;
    },
    modelChosen(model) {
      this.form.model = model;
    },
    async createTransport() {
      const request = new Request(
          "http://localhost/transports/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.form),
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
