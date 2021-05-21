<template>
  <div class="menu-wrapper">
    <b-row class="menu px-5 pt-3 pb-3 ">
      <b-col class="col-lg-1 py-1">
        <a href="/">
          <img class="logo" width="150%" src="../assets/Tripbook-logo/vector/default-monochrome-black.svg">
        </a>
      </b-col>
      <b-col class="offset-lg-3 col-lg-2 pt-2">
        <button class="tab-button">Арендовать транспорт</button>
      </b-col>
      <b-col class="col-lg-3 pt-2">
        <button class="tab-button">Не хочу быть за штурвалом</button>
      </b-col>
      <div class="offset-lg-2 col-lg-1 " v-if="$store.state.authorised" >
        <UserNavbar></UserNavbar>
      </div>
      <div class="offset-lg-2 col-lg-1 " v-else>
        <AnonymousNavbar :user="user"/>
      </div>
    </b-row>
  </div>
</template>

<script>
import AnonymousNavbar from "./AnonymousNavbar";
import UserNavbar from "@/layouts/UserNavbar";
export default {
  name: "MenuLayout",
  components: {UserNavbar, AnonymousNavbar},
  data() {
    return {
      user: {}
    }
  }
}
</script>

<style>
.menu {
  font-size: 18px;
  font-weight: 350;
  background: none;
  width: 100% ;
}

.tab-button:hover {
  border-bottom: 2px solid black;
}

.tab-button:focus {
  border-bottom: 2px solid black;
}
.dropdown-content {
  right: 50px;
  background-color: white;
  position: absolute;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 1 ;

  border-radius: 5%;
  width: 300px;
}
.dropdown-content a {
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  display: block;
  font-size: 17px;
}

.my-dropdown {
}

.my-dropdown-toggle {
  right: 50px;
  background: #e9d6d6;
  border-radius: 50%;
  border: #cbbcbc solid 1px;
  width: 50px;
  height: 45px;
}

.dropdown-content a:hover {
  color:#00A0C6;
  text-decoration:none;
  cursor:pointer;
}
</style>
