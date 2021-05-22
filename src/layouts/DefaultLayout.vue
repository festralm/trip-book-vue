<template>
  <div class="default">
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";
import BackgroundLayout from "@/layouts/BackgroundLayout";
import router from "@/router";

export default {
  name: "DefaultLayout",
  data() {
    return {
    }
  },
  async beforeMount() {
    console.log(Object.keys(localStorage))

    var request = new Request(
        "http://localhost/",
        {
          method: "GET",
        }
    );
    if (this.$store.state.token !== null) {
      console.log(this.$store.state.token);
      request.headers.append("Authorization", this.$store.state.token);
    }
    var response = await fetch(request);
    console.log(response);
    if (response.status === 200) {
      response.json().then(data => {
        if (data['statusNumber'] !== 4) {
          if (this.$store.state.token !== '') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('authorised');
          }
        } else {
          localStorage.setItem('user', JSON.stringify(data['body']));
          localStorage.setItem('authorised', 'true');
          router.push("/")
        }
      })
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('authorised');
    }
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
  font: inherit;
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

</style>
