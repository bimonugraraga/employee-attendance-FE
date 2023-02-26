import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
Vue.use(Vuex)
let url = `http://localhost:3000/v1`
export default new Vuex.Store({
  state: {
    attendance: [],
    employee: [],
    isLogin: false,
    role: null
  },
  mutations: {
    SET_ATTENDANCE(state,dataload){
      state.attendance = dataload
    },
    SET_EMPLOYEE(state,dataload){
      state.employee = dataload
    },
    SET_ISLOGIN(state,dataload){
      state.isLogin = dataload
    },
    SET_ROLE(state,dataload){
      state.role = dataload
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, rejects) => {
        let sendToURL = url
        if (payload.type == 'admin') {
          sendToURL += `/admin/login`
        } else {
          sendToURL += `/employee/login`
        }

        axios.post(sendToURL, payload)
          .then((resp) => {
            context.commit('SET_ISLOGIN', true)
            console.log(resp.data.role)
            context.commit('SET_ROLE', resp.data.role)
            localStorage.role = resp.data.role
            localStorage.access_token = resp.data.access_token
            Swal.fire({
              icon: 'success',
              title: 'Horray',
              text: "Welcome",
            })
            resolve(resp.data)
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: err.response.data.message,
            })
            console.log(err.response.data)
            rejects()
          })
      })
    },
    createAttendance(context, payload){
      return new Promise((resolve, rejects) => {
        let sendToURL = url + '/employee/attendance'

        axios.post(sendToURL, payload, {
          headers: {
            Authorization: "Bearer "+localStorage.access_token
          }
        })
        .then((resp) => {
          Swal.fire({
            icon: 'success',
            text: "Success Create Attendance",
          })
          resolve()
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: "Failed Create Attendance",
          })
          console.log(err.response.data)
          rejects()
        })
      })
    },
    async getAllAttendance(context, payload) {
      try {
        if (!payload) {
          payload = {
            page: 1,
            username:""
          }
        }
        
        let sendToURL = url + '/admin/employee/attendance?'
        sendToURL = sendToURL + `page=${payload.page}&username=${payload.username}`
        if (payload) {
          if (payload.date_attendance) {
            sendToURL += `&date_attendance=${payload.date_attendance}`
          }
        }
  
        let resp = await axios.get(sendToURL, {
          headers: {
            Authorization: "Bearer "+localStorage.access_token
          }
        })
        if (resp.data) {
          context.commit('SET_ATTENDANCE', resp.data)
  
        }
      } catch (error) {
        console.log(error)
      }
      
    },
    async getAllEmployee(context, payload) {
      try {
        if (!payload) {
          payload = {
            page: 1,
            username:""
          }
        }
        let sendToURL = url + `/admin/employee?page=${payload.page}&username=${payload.username}`
        let resp = await axios.get(sendToURL, {
          headers: {
            Authorization: "Bearer "+localStorage.access_token
          }
        })
        if (resp.data) {
          context.commit('SET_EMPLOYEE', resp.data)
  
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editEmployee(context, payload) {
      try {
        let sendToURL = url + `/admin/employee/${payload.id}`
        let updated = await axios.put(sendToURL, payload, {
          headers: {
            Authorization: "Bearer "+localStorage.access_token
          }
        })
        if (updated) {
          Swal.fire({
            icon: 'success',
            text: "Success Update Password",
          })
          return true
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: error.response.data.message,
        })
        console.log(error)
      }
    },
    async createEmployee(context, payload) {
      return new Promise((resolve, rejects) => {
        let sendToURL = url + `/admin/employee`

        axios.post(sendToURL, payload, {
          headers: {
            Authorization: "Bearer "+localStorage.access_token
          }
        })
        .then((resp) => {
          Swal.fire({
            icon: 'success',
            text: "Success Add Employee",
          })
          resolve(true)
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: "Invalid Input",
          })
          console.log(err.response.data)
          rejects(false)
        })
      })
      
    },
    async deleteEmployee(context, payload) {
      return new Promise((resolve, rejects) => {
        let sendToURL = url + `/admin/employee/${payload.id}`

        axios.delete(sendToURL, {
          headers: {
            Authorization: "Bearer "+localStorage.access_token
          }
        })
        .then((resp) => {
          Swal.fire({
            icon: 'success',
            text: "Success Delete Employee",
          })
          resolve(true)
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: "Failed Input",
          })
          console.log(err.response.data)
          rejects(false)
        })
      })
      
    }
  },
  modules: {
  }
})
