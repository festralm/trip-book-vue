<template>
  <div class="sign-in">
    <h3>Вход</h3>
    <form @submit.prevent="signIn" action="" method="post">
      <div v-if="errors" class="errors">
        <p v-for="(error, field) in errors" :key="field">
          {{error[0]}}
        </p>
      </div>
      <p><input type="email" v-model="form.email" name="username" placeholder="Введите email"></p>
      <p><input type="password" v-model="form.password" name="password" placeholder="Введите пароль"></p>
      <p><input type="submit" value="Войти"></p>
      <p><router-link to="/sign-up" class="link">Еще не зарегистрированы?</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignInForm",
  data() {
    return {
      form: {
        email: 'alia@gmail.com',
        password: "alia",
      },
      errors: {

      }
    }
  },
  methods: {
    signIn() {

    }
  }
}
</script>

<style scoped>

</style>
