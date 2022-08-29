<template>
  <div class="rent" id="rent">
    <div class="left">
      <div class="text">
        <p class="name ">Загрузите фотографии вашего транспортного средства</p>
      </div>
    </div>
    <div class="right">
      <div class="my-input">
        <input class="image-input" @change="getFiles" type="file" name="photos" multiple="multiple" accept="image/png, image/jpeg">
      </div>
      <div class="footer">
        <div class="footer-content m-4">
          <b-button class="back" @click="$emit('back')" variant="outline-secondary">Назад</b-button>
          <b-button class="next" @click="$emit('next')" variant="secondary">Продолжить</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Photos10",
  methods: {
    getFiles(event) {
      this.$store.state.transportForm['carPhotoUrls'] =
          Object.entries(event.target.files).map((x, y) => x[1].name);
    }
  }
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
  margin: 80px auto auto;

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

.footer {
  width: 100%;
}
.my-input {
  margin: 300px auto 296px auto;
  width: 80%;

}
.image-input::-webkit-file-upload-button {
  visibility: hidden;
  width: 0;
}
.image-input {

  display: inline-block;
  -webkit-user-select: none;
  cursor: pointer;
  margin-left: 100px;
  margin-right: 100px;
  padding-top: 13px;

  border: 3px solid #969696;
  height: 70px;

  width: 70%;
  border-radius: 20px;
  font-size: 20px;
}


.image-input:hover {
  background-color: #969696;

}

</style>
