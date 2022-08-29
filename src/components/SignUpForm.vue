<template>
  <div class="sign-in p-3 mx-3 mb-3">
    <h3 class="text-center pb-3 pt-2">Регистрация</h3>
    <b-form id="form" @submit.prevent="signUp" action="" method="post">
      <div v-if="errors" >
        <p class="errors text-center my-0 pb-2" v-for="(error, key) in errors" :key="key">
          {{ error }}
        </p>
      </div>
      <b-form-input class="my-2" required type="email" v-model="form.email" name="username" placeholder="Email"></b-form-input>
      <b-form-input class="my-2" @change="checkPasswords()" required minlength="8" type="password"
                    v-model="form.password" name="password" placeholder="Пароль"></b-form-input>
      <b-form-input class="my-2" @change="checkPasswords()" required minlength="8" type="password"
                    v-model="form.passwordRepeat" name="password-repeat" placeholder="Повторите пароль"></b-form-input>
      <b-button :disabled="isDisabled" class="button my-2 w-100" variant="primary" type="submit">Зарегистрироваться</b-button>
      <p class=" text-center m-0 p-1"><router-link to="/sign-in" class="link">Уже зарегистрированы?</router-link></p>
      <p class="text-center m-0 p-1">или</p>
      <hr>
      <b-button class="text-center w-100 my-2" variant="outline-secondary">
        <div class="google">
          <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 20px; width: 20px; display: block;">
            <g fill="none" fill-rule="evenodd">
              <path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335">
              </path>
              <path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4">
              </path>
              <path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05">
              </path>
              <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853">
              </path>
              <path d="M0 0h18v18H0V0z">
              </path
              ></g>
          </svg>
        </div>
        <!--        todo confirmation!-->
        <!--        todo google auth-->
        <!--        todo password regex-->
        <a>Продолжить с Google</a>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "SignUpForm",
  data() {
    return {
      form: {
        email: '',
        password: "",
        passwordRepeat: ""
      },
      errors: new Set(),
      isDisabled: true,
    }
  },
  methods: {
    async signUp() {
      const request = new Request(
          "http://localhost/sign-up",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.form),
          },
      );
      const response = await fetch(request);
      if (response.status === 200) {
        response.json().then(data => {
            localStorage.setItem('token', response.headers.get("Authorization"));
            localStorage.setItem('authorised', 'true');
            router.push("/");
          this.$emit("updateMenu");
        })
      } else if (response.status === 403) {
        console.log(response)
        this.errors.add('Этот email уже занят');
        this.$forceUpdate()
      } else {
        router.push("error/default");
      }

    },
    checkPasswords() {
      if (this.form.password !== '' && this.form.passwordRepeat !== '') {
        if (this.form.password !== this.form.passwordRepeat) {
          this.errors.add("Пароли не совпадают!");
          this.isDisabled = true;
        } else {
          this.errors.delete("Пароли не совпадают!");
          this.isDisabled = false;
        }
      } else {
        this.isDisabled = true;
      }
      this.$forceUpdate();
    }
  }
}
</script>

<style scoped>

</style>
