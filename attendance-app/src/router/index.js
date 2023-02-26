import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import EmployeeAttendance from '../views/EmployeeAttendance.vue'
import EmployeeTable from '../views/EmployeeTable'
import AttendanceTable from '../views/AttendanceTable'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/employee-list',
    name: 'EmployeeTable',
    component: EmployeeTable
  },
  {
    path: '/attendance-list',
    name: 'AttendanceTable',
    component: AttendanceTable
  },
  {
    path: '/take-attendance',
    name: 'EmployeeAttendance',
    component: EmployeeAttendance
  }

]

const router = new VueRouter({
  routes
})

export default router
