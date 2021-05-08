<template>
  <div class="sign-up">
    <h3>Регистрация</h3>
    <form @submit.prevent="signUp" action="" method="post">
      <div v-if="errors" class="errors">
        <p v-for="(error, field) in errors" :key="field">
          {{error[0]}}
        </p>
      </div>
      <p><input type="email" v-model="form.email" name="username" placeholder="Введите email"></p>
      <p><input type="password" v-model="form.password" name="password" placeholder="Введите пароль"></p>
      <p><input type="password" v-model="form.passwordRepeat" name="password-repeat" placeholder="Повторите пароль"></p>
      <p><input type="submit" value="Зарегистрироваться"></p>
      <p><router-link to="/sign-in" class="link">Уже зарегистрированы?</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUpForm",
  data() {
    return {
      form: {
        email: 'alia@gmail.com',
        password: "alia",
        passwordRepeat: "alia"
      },
      errors: {

      }
    }
  },
  methods: {
    signUp() {

    }
  }
}
</script>

<style scoped>

</style>
