<template>
  <div class="container">
    <h1>Bienvenido!</h1>
    <div>
      <form className="form">
        <div>
          <label for="email" class="text">Email</label>
          <input v-model="email" type="email" class="input" id="email" placeholder="Email" />
        </div>
        <div>
          <label for="password" class="text">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="input"
            id="password"
            placeholder="Contraseña"
          />
        </div>
        <a @click="login" class="btn" :href="path">Iniciar sesión</a>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      path: "/Dashboard"
    }
  },
  props: {
    msg: String
  },
  methods: {
    login() {
      // Lógica de inicio de sesión
    }
  }
}
</script>

<style scoped>
.container {
  background-color: aliceblue;
  border-radius: 20px;
  max-width: 400px;
  padding: 200px;
  display: flex;
  flex-direction: column;
}
.form {
  display: flex;
  flex-direction: column;

  justify-content: space-evenly;
  height: 40vh;
}
.btn {
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  background-color: rgba(111, 175, 230, 0.452);
  padding: 8px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: black;
}
.btn:hover {
  background-color: rgba(111, 175, 230, 0.603);
}
.input {
  border: none;
  border-radius: 10px;
  padding: 5px;
  background-color: rgba(205, 230, 252, 0.425);
}
.text {
  font-size: 15px;
  cursor: default;
}
</style>
