<template>
  <div class="default">
    <my-menu></my-menu>
    <router-view @updateMenu="updateMenu()"/>
    <MyFooter></MyFooter>
  </div>
</template>

<script>

import MyMenu from "@/layouts/MyMenu";
import router from "@/router";
import MyFooter from "./MyFooter";
export default {
  name: "DefaultLayout",
  components: {MyFooter, MyMenu},
  data() {
    return {
    }
  },
  methods: {
    updateMenu() {
      this.$store.state.authorised = 'true';
      console.log('update')
      this.$store.state.menuShow = false;
      this.$forceUpdate()
    }
  },
  async beforeMount() {
    this.$store.state.menuShow = false;
    var request = new Request(
        "http://localhost/",
        {
          method: "GET",
        }
    );
    if (this.$store.state.token !== null) {
      request.headers.append("Authorization", this.$store.state.token);
    }
    var response = await fetch(request);
    if (response.status === 200) {
      response.json().then(data => {
          localStorage.setItem('token', this.$store.state.token);
          localStorage.setItem('authorised', 'true');
          console.log(data)
          localStorage.setItem('isAdmin', String(data['role'] === 'ADMIN'));
        console.log(this.$store.state.isAdmin)
      })
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('authorised');
      localStorage.removeItem('isAdmin');
      if (response.status !== 203) {
        router.push("/error/default")
      }
    }
    this.$forceUpdate();
  }
}
</script>

<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
  font-family: 'Roboto Mono', monospace;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
table {
  border-collapse: collapse;
  border-spacing: 0;
}

button {
  overflow: hidden;
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
}

a {
  color: black;
  text-decoration: none;
}

</style>
