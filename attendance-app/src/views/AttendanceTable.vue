<template>
  <div class="overflow-auto">
    <div class="btn-page">
      
      <div class="input-group">
        <form @submit.prevent="search">
          
          <div class="form-outline">
            <label class="form-label" for="form1">Username</label>
            <input type="search" id="form1" class="form-control" v-model="username"/>
            <label class="form-label" for="form1">Date</label>
            <input type="date" id="form1" class="form-control" v-model="date_attendance"/>
            <button type="submit" class="btn btn-primary search-btn">
              <i class="fas fa-search">search</i>
            </button>
          </div>
        </form>
      
      </div>
      <p1>{{this.currentPage}} / {{Math.ceil(attendance.count/10)}}</p1>
      <button @click="changePage('prev')" class="btn btn-primary page-btn"> Prev </button>
      <button @click="changePage('next')" class="btn btn-primary page-btn"> Next </button>
      <p>Limit: 10 Data / Page</p>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">username</th>
          <th scope="col">date</th>
          <th scope="col">time</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody v-for='item in attendance.rows' v-bind:key='item.id'>
        <tr>
          <th scope="row">{{item.id}}</th>
          <td>{{item.Employee.username}}</td>
          <td>{{item.date_attendance}}</td>
          <td>{{item.time_attendance}}</td>
          <td>
            <button type="button" class="btn btn-primary btn-action" @click="showModal(item.picture, item.Employee.username)">Detail</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <b-modal ref="my-modal" hide-footer title="Using Component Methods">
        <div class="d-block text-center">
          <h3>{{itemUser}}</h3>
          <img :src="itemPic" />
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttendanceTable",
  data() {
      return {
        currentPage: 1,
        itemPic: null,
        itemUser: null,
        username:"",
        date_attendance:null
      }
    },
  computed: {
    rows() {
      return this.items.length
    }
  },
  created() {
    this.$store.dispatch('getAllAttendance', null)
    if (localStorage.access_token){
      this.$store.commit('SET_ISLOGIN', true)
      this.$store.commit('SET_ROLE', "admin")
    }
  },
  computed: {
    attendance() {
      return this.$store.state.attendance
    }
  },
  methods: {
    changePage(params) {
      if (params == "prev") {
        this.currentPage--
        if (this.currentPage < 1) {
          this.currentPage = 1
        }
      } else if (params == "next") {
        if (this.currentPage != Math.ceil(this.attendance.count/10)){
          this.currentPage++
        }
      }
      let payload = {
        username: this.username,
        date_attendance: !this.date_attendance? undefined: this.date_attendance,
        page: this.currentPage
      }
      this.$store.dispatch('getAllAttendance', payload)
    },
    search(){
      let payload = {
        username: this.username,
        date_attendance: !this.date_attendance? undefined: this.date_attendance,
        page: 0
      }
      this.$store.dispatch('getAllAttendance', payload)
    },
    showModal(itemPic, itemUser) {
      this.itemPic = itemPic
      this.itemUser = itemUser
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
  }
}
</script>

<style>
.btn-action{
  width: 70px;
  margin: 10px;
}
.page-btn {
  width: 70px;
  margin: 10px;
}
</style>