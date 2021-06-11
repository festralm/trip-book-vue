<template>
  <div class="rent" id="rent">
    <div class="left">
      <div class="text">
        <p class="name ">Какой вид транспорта вы желаете сдать?</p>
      </div>
    </div>
    <div class="right">
      <div class="types">
        <b-button @click="choose(1)" v-bind:class="{chosen: firstChosen}" variant="outline-secondary"
                  class="my-button my-2 text-start">
          <p class="pt-2 ps-2">Легковой автомобиль</p>
          <div class="image">
            <img src="../../assets/icon1.jpg"/>
          </div>
        </b-button>
        <!--        todo all-->
        <b-button @click="choose(2)" v-bind:class="{chosen: secondChosen}" variant="outline-secondary"
                  class="my-button  my-2 text-start">
          <p class="pt-2 ps-2">Водный транспорт</p>
          <div class="image">
            <img src="../../assets/icon2.jpg"/>
          </div>
        </b-button>
        <b-button @click="choose(3)" v-bind:class="{chosen: thirdChosen}" variant="outline-secondary"
                  class="my-button  my-2 text-start">
          <p class="pt-2 ps-2">Для бизнеса</p>
          <div class="image">
            <img src="../../assets/icon3.jpg"/>
          </div>
        </b-button>
        <b-button @click="choose(4)" v-bind:class="{chosen: forthChosen}" variant="outline-secondary"
                  class="my-button  my-2 text-start">
          <p class="pt-2 ps-2">Воздушный транспорт</p>
          <div class="image">
            <img src="../../assets/icon4.jpg"/>
          </div>
        </b-button>
        <b-button @click="choose(5)" v-bind:class="{chosen: fifthChosen}" variant="outline-secondary"
                  class="my-button my-2 text-start">
          <p class="pt-2 ps-2">Легенда</p>
          <div class="image">
            <img src="../../assets/icon5.jpg"/>
          </div>
        </b-button>
        <b-button @click="choose(6)" v-bind:class="{chosen: sixthChosen}" variant="outline-secondary"
                  class="my-button  my-2 text-start">
          <p class="pt-2 ps-2">Экологичный транспорт</p>
          <div class="image">
            <img src="../../assets/icon6.jpg"/>
          </div>
        </b-button>
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
  name: "Type1",
  data() {
    return {
      firstChosen: false,
      secondChosen: false,
      thirdChosen: false,
      forthChosen: false,
      fifthChosen: false,
      sixthChosen: false,
    }
  },
  methods: {
    choose(num) {
      this.firstChosen = false;
      this.secondChosen = false;
      this.thirdChosen = false;
      this.forthChosen = false;
      this.fifthChosen = false;
      this.sixthChosen = false;
      this.$store.state.transportForm['type'] = num;

      this.chooseButton(num);
    },
    chooseButton(num) {
      switch (num) {
        case 1:
          this.firstChosen = true;
          break;
        case 2:
          this.secondChosen = true;
          break;
        case 3:
          this.thirdChosen = true;
          break;
        case 4:
          this.forthChosen = true;
          break;
        case 5:
          this.fifthChosen = true;
          break;
        case 6:
          this.sixthChosen = true;
          break;
      }
    }
  },
  beforeMount() {
    this.chooseButton(this.$store.state.transportForm['type'])
  }
}
</script>

<style scoped>
.rent {
  height: 722px;

  font-family: 'Roboto Mono', monospace;
}
.left {
  float: left;
  width: 50%;
  background: rgb(255,125,117);
  background: linear-gradient(15deg, rgba(255,125,117,1) 0%, rgba(254,134,255,1) 35%, rgba(255,250,143,1) 100%);
  height: 722px;
}
.right {
  float: right;
  width: 50%;
  height: 722px;
}
.text {
  width: 73%;
  margin: 250px auto auto;

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

.types {
  margin: 80px auto 70px  auto;
  width: 50%;
}

.types .my-button {
  width: 100%;
  height: 70px;
  border-radius: 20px;
  font-size: 20px;
}

.chosen {
  border: 3px solid #969696;
  background-color: #ececec;
}
.types p {
  float: left;
}

.types img {
  float: right;
}
.image img {
  height: 52px;
  border-radius: 10px;
}
</style>
