<template>
  <div class="my-form bg-dark">
  <h1>Login Form</h1>
  <form @submit.prevent="login">
    <div class="mb-3 mt-4">
      <label for="exampleInputUsername1" class="form-label">Username</label>
      <input type="text" class="form-control" id="exampleInputUsername1" v-model="username">
    </div>
    <div class="mb-3 mt-4">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
    </div>
    <div class="loginRole">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" v-model="type" value="employee">
        <label class="form-check-label" for="flexRadioDefault1">
          Employee
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="type" value="admin" checked>
        <label class="form-check-label" for="flexRadioDefault2">
          Admin
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-light mt-3">LOGIN</button>
  </form>
  <p class="mt-4">Not a member? <a href="#">Signup now</a></p>
</div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      username:"",
      password:"",
      type:""
    }
  },
  methods: {
    async login() {
      console.log(this.username, this.password, this.type)
      let payload = {
        username: this.username,
        password: this.password,
        type: this.type
      }

      let data = await this.$store.dispatch('login', payload)
      if(data.role == 'admin') {
        this.$router.push({name: 'AttendanceTable'})
      } else {
        this.$router.push({name: 'EmployeeAttendance'})
      }
    }
  }
}
</script>

<style>
.my-form {
  padding: 2em;
  color: #fff;
  max-width: 55vh;
  margin-inline: auto;
}
h1 {
  font-weight: bold;
  text-align: center;
  font-size: 2.5em;
}
.form-control {
  background-color: inherit;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  padding-left: 0;
}
.form-control:focus {
  background-color: inherit;
  color: #fff;
  box-shadow: none;
  border-color: #fff;
}
.btn {
  border-radius: 0;
  width: 100%;
  font-weight: bold;
}
.my-form p {
  color: gray;
  text-align: center;
}

.my-form p a {
  color: #e1e1e1;
  text-decoration: none;
}
.my-form p a:hover {
  color: #fff;
}
.loginRole {
  display: flex;
  justify-content: space-evenly;
}
</style>