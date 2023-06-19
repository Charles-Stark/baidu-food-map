import {createRouter, createWebHistory} from 'vue-router'
import IndexView from "@/views/IndexView.vue";
import MapView from "@/views/MapView.vue";

const routes = [
    {
        path: '/',
        name: 'IndexView',
        component: IndexView
    },
    {
        path: '/map',
        name: 'MapView',
        component: MapView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
