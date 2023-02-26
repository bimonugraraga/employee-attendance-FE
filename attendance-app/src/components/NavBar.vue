<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" v-if="isLogin == false">Log In</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" v-if="isLogin == true" @click.prevent="logOut">Log Out</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" v-if="$store.state.isLogin === true && $store.state.role === 'employee' " @click.prevent="toPage('EmployeeAttendance')">Take Attendance</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" v-if="$store.state.isLogin === true && $store.state.role === 'admin' " @click.prevent="toPage('AttendanceTable')">List Attendance</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" v-if="$store.state.isLogin === true && $store.state.role === 'admin' " @click.prevent="toPage('EmployeeTable')">List Employee</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data(){
    return {
      role: localStorage.role,
      access_token: null
    }
  },
  created(){
    if (localStorage.access_token){
      this.$store.commit('SET_ISLOGIN', true)
    }
    this.access_token = localStorage.access_token
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('role')
      this.$store.commit('SET_ISLOGIN', false)
      this.access_token = null
      this.role = null
      this.$router.push({name: 'Login'})
    },
    toPage(page) {
      this.$router.push({name: page})
    }
  }
}
</script>

<style>

</style>