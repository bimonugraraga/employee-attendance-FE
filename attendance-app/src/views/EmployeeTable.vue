<template>
  <div class="overflow-auto">
    <div class="btn-page">
      <div class="input-group">
        <form @submit.prevent="search">

          <div class="form-outline">
            <label class="form-label" for="form1">Username</label>
            <input type="search" id="form1" class="form-control" v-model="username"/>
            <button type="submit" class="btn btn-primary search-btn">
              <i class="fas fa-search">search</i>
            </button>
          </div>
          
        </form>
      </div>
      <p1>{{this.currentPage}} / {{Math.ceil(employee.count/10)}}</p1>
      <button @click="changePage('prev')" class="btn btn-primary page-btn2"> Prev </button>
      <button @click="changePage('next')" class="btn btn-primary page-btn2"> Next </button>
      <button @click="showModal2()" class="btn btn-success page-btn3"> Add Employee </button>
      <p>Limit: 10 Data / Page</p>
    </div>
    
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">username</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody v-for='item in employee.rows' v-bind:key='item.id'>
        <tr>
          <th scope="row">{{item.id}}</th>
          <td>{{item.username}}</td>
          <td>
            <button type="button" class="btn btn-primary btn-action" @click="showModal(item.id, item.username)">Edit</button>
            <button type="button" class="btn btn-danger btn-action" @click="deleteEmp(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <b-modal ref="my-modal" hide-footer title="Using Component Methods">
        <div class="d-block text-center">
          <h3>{{itemUser}}</h3>
        </div>
        <form @submit.prevent="edit">
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="newPassword">
          </div>
          <button type="submit" class="btn btn-primary" >Submit</button>
        </form>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      </b-modal>
    </div>
    <div>
      <b-modal ref="my-modal2" hide-footer title="Using Component Methods">
        <div class="d-block text-center">
          <h3>NEW EMPLOYEE</h3>
        </div>
        <form @submit.prevent="create">
          <div class="form-group">
            <label for="exampleInputUsername1" class="form-label">Username</label>
            <input type="text" class="form-control" id="exampleInputUsername1" v-model="createUsername">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="createPassword">
          </div>
          <button type="submit" class="btn btn-primary" >Submit</button>
        </form>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeeTable",
  data() {
      return {
        currentPage: 1,
        itemId: null,
        newPassword: null,
        itemUser: "",
        createPassword:"",
        createUsername:"",
        username: ""
      }
    },
  computed: {

    employee() {
      return this.$store.state.employee
    }
  },
  created() {
    this.$store.dispatch('getAllEmployee', null)
    this.$store.commit('SET_ISLOGIN', true)
      this.$store.commit('SET_ROLE', "admin")
  },
  methods: {
    changePage(params) {
      console.log("OK")
      if (params == "prev") {
        this.currentPage--
        if (this.currentPage < 1) {
          this.currentPage = 1
        }
      } else if (params == "next") {
          if (this.currentPage != Math.ceil(this.employee.count/10)){
          this.currentPage++
        }
      }

      let payload = {
        username: this.username,
        page: this.currentPage
      }
      this.$store.dispatch('getAllEmployee', payload)
    },
    showModal(itemId, itemUser) {
      this.itemId = +itemId
      this.itemUser = itemUser
      this.$refs['my-modal'].show()
    },
    showModal2() {
      this.$refs['my-modal2'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
      this.$refs['my-modal2'].hide()
    },
    edit() {
      let payload = {
        password: this.newPassword,
        id: this.itemId
      }
      let updated = this.$store.dispatch('editEmployee', payload)
      if (updated) {
        this.newPassword=""
        this.hideModal()
      }
    },
    create() {
      let payload = {
        username: this.createUsername,
        password: this.createPassword
      }

      this.$store.dispatch('createEmployee', payload)
      .then(() => {
        this.hideModal()
        this.$store.dispatch('getAllEmployee', null)
        this.createUsername= ""
        this.createPassword=""
      })
      .catch((err) => {
        console.log(err)
      })
    },
    search(){
      let payload = {
        username: this.username,
        page: 0
      }
      this.$store.dispatch('getAllEmployee', payload)
    },
    deleteEmp(item_id) {
      let payload = {
        id: item_id
      }
      this.$store.dispatch('deleteEmployee', payload)
      .then(() => {
        this.$store.dispatch('getAllEmployee', null)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

.btn-action{
  width: 70px;
  margin: 10px;
}
.page-btn2 {
  width: 70px;
  height: 50px;
  margin: 10px;
}
.page-btn3 {
  width: 150px;
  height: 50px;
  margin: 10px;
}
</style>