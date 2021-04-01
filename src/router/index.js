import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "../layout/MainLayout.vue"
import AdminLayout from "../layout/AdminLayout.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/contact',
        component: () => import('../views/Contact.vue')
      }
    ]
  },

  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '/',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: '/patients',
        component: () => import('../views/Admin/cUser.vue')
      },
      {
        path: '/appointment',
        component: () => import('../views/Admin/cAppointment.vue')
      },
      {
        path: '/medicine',
        component: () => import('../views/Admin/cMedicine.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
