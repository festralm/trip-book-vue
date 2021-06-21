<template>
  <div class="rent" id="rent">
    <div class="left">
      <div class="text">
        <p class="name ">Опишите ваше объявление</p>
      </div>
    </div>
    <div class="right">
      <div class="my-input ">
        <b-form-textarea  class="description-input my-4 py-2" v-model="$store.state.transportForm['description']"
                     placeholder="Введите текст" v-bind:value="$store.state.transportForm['description']"></b-form-textarea>
      </div>
<!--      todo length error-->
      <div class="my-footer">
        <div class="footer-content m-4">
          <b-button class="back" @click="$emit('back')" variant="outline-secondary">Назад</b-button>
          <b-button class="next" @click="$emit('next')" variant="secondary"
          v-bind:disabled="$store.state.transportForm.description.length > 1000">Продолжить</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Description8"
}
</script>

<style scoped>

.rent {
  height: 723px;

  font-family: 'Roboto Mono', monospace;
}
.left {
  float: left;
  width: 50%;
  background: rgb(255,125,117);
  background: linear-gradient(15deg, rgba(255,125,117,1) 0%, rgba(254,134,255,1) 35%, rgba(255,250,143,1) 100%);
  height: 723px;
}
.right {
  float: right;
  width: 50%;
  height: 723px;
}
.text {
  width: 70%;
  margin: 100px auto auto;

}
.name {
  font-size: 45px;
  font-weight: bold;
}
.back {
  float: left;
}
.next {
  float: right;
}

.my-footer {
  width: 100%;
}
.my-input {
  margin: 210px auto 156px auto;
  width: 70%;

}
.description-input {
  resize: none;
  height: 300px;
}
</style>
