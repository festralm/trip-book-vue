<template>
  <div class="sign-in">
    <h3>Вход</h3>
    <form id="form" @submit.prevent="signIn" action="" method="post">
      <div v-if="errors" class="errors">
        <p v-for="(error, field) in errors" :key="field">
          {{error[0]}}
        </p>
      </div>
      <p><input required type="email" v-model="form.email" name="username" placeholder="Введите email"></p>
      <p><input required type="password" v-model="form.password" name="password" placeholder="Введите пароль"></p>
      <p><input type="submit" value="Войти"></p>
      <p><router-link to="/sign-up" class="link">Еще не зарегистрированы?</router-link></p>
    </form>
  </div>
</template>

<script>


import router from "@/router";

export default {
  name: "SignInForm",
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {

      },
    }
  },
  methods: {
    async signIn() {
      const request = new Request(
          "http://localhost/sign-in",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.form),
          }
      );
      await fetch(request)
          .then(function (response) {
            console.log(response.headers.get("Authorization"));
            router.push("/")
          });
    }
  }
}
</script>

<style scoped>

</style>
