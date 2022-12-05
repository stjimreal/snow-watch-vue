/*
 * @Date: 2022-04-18 00:52:06
 * @LastEditors: LIULIJING
 * @LastEditTime: 2022-04-29 18:21:29
 */
import {createRouter, createWebHashHistory} from 'vue-router'

import AppView from "@/components/AppView";

const views = name => () => import('@/views/' + name);
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: AppView,
            children: [
                {path: '/view', name: 'world', component: views('ViewWorld')},
                {path: '/analysis', name: 'trend', component: views('ViewWorld')},
                // {path: '/about', name: 'about', component: views('ViewAbout')}
            ]
        },
    ]
})

export default router
