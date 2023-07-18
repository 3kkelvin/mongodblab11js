//simport Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import findOne from '../components/findOne.vue';
import findAll from '../components/findAll.vue';
import addMember from '../components/addMember.vue';
import updateMember from '../components/updateMember.vue';
import deleteMember from '../components/deleteMember.vue';



const routes = [
    {
        path: '/find-one',
        name: 'findOne',
        component: findOne,
    },
    {
        path: '/find-all',
        name: 'findAll',
        component: findAll,
    },
    {
        path: '/add-member',
        name: 'addMember',
        component: addMember,
    },
    {
        path: '/update-member',
        name: 'updateMember',
        component: updateMember,
    },
    {
        path: '/delete-member',
        name: 'deleteMember',
        component: deleteMember,
    },
];

const router = createRouter({

    history: createWebHistory(),
    routes,
})

export default router;
