import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: RegisterView },
        { path: '/profile', component: ProfileView },
    ],
})