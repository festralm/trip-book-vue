<template >
  <div class="menu-container" v-bind:class="{fixed: $store.state.fixed}">
    <div>
      <a href="/">
        <img width="130" src="../assets/Tripbook-logo/vector/default-monochrome-black.svg">
      </a>
    </div>
    <div>
      <button class="tab pb-1" v-bind:style="notDriverBorder" @click="changeNotDriver()">Арендовать транспорт</button>
    </div>
    <div>
      <button class="tab pb-1" v-bind:style="driverBorder" @click="changeDriver()">Не хочу быть за штурвалом</button>
    </div>
    <div>
      <div class="profile-button" @click="openMenu()">
          <img class="p-1" width="45" src="https://img.icons8.com/pastel-glyph/64/000000/gender-neutral-user.png"/>
      </div>
      <div v-show="$store.state.menuShow" v-if="$store.state.authorised" >
        <UserNavbar @updateMenu="updateMenu()"></UserNavbar>
      </div>
      <div v-show="$store.state.menuShow" v-else>
        <AnonymousNavbar></AnonymousNavbar>
      </div>
    </div>
  </div>
</template>

<script>
import AnonymousNavbar from "../components/AnonymousNavbar";
import UserNavbar from "@/components/UserNavbar";
export default {
  name: "MyMenu",
  components: {UserNavbar, AnonymousNavbar},
  data() {
    return {
    }
  },
  computed: {
    driverBorder: function () {
      if (this.$store.state.menuDriver) {
        return {
          'border-bottom': '2px solid #eedcdc',
        }
      } else {
        return {
          'border-bottom': 'none',
        }
      }
    },
    notDriverBorder: function () {
      if (this.$store.state.menuNotDriver) {
        return {
          'border-bottom': '2px solid #eedcdc',
        }
      } else {
        return {
          'border-bottom': 'none',
        }
      }
    },
  },
  methods: {
    updateMenu() {
      this.$store.state.menuShow = false;
      this.$store.state.authorised = null;
      this.$forceUpdate();
    },
    openMenu() {
      this.$store.state.menuShow = !this.$store.state.menuShow;
    },
    changeDriver() {
      this.$store.state.menuDriver = true;
      this.$store.state.menuNotDriver = false;
    },
    changeNotDriver() {
      this.$store.state.menuNotDriver = true;
      this.$store.state.menuDriver = false;
    }
  }
}
</script>

<style>
.dropdown-container {
  margin-top: 20px;
  padding: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  right: 50px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  border-radius: 15px;
  width: 300px;
}
.fixed {
  position: fixed;
}

.menu-container {
  font-family: 'Roboto Mono', monospace;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  font-size: 17px;
  font-weight: 350;
  background-color: white;
  width: 100%;
  z-index: 100;
  top: 0;
  box-shadow: 0 0 5px 1px #c4c4c4;
}

.profile-button {
  cursor: pointer;
  border: 2px solid #eedcdc;
  border-radius: 100px;
}
.profile-button:hover {
  border: 2px solid #b8a7a7;
  background-color: #eedcdc;
}
.dropdown-container a {
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  font-size: 17px;
  margin: 4px 0 4px 0;
  cursor: pointer;
}
.dropdown-container a:hover {
  color: #b8a7a7;
}

.dropdown-container hr {
  color: #eedcdc;
  width: 100%;
}
</style>
