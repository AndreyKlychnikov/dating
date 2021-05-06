import Vue from 'vue';
import Router from 'vue-router';

import RouterComponent from './components/RouterComponent.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import(/* webpackChunkName: "start" */ './views/admin/Start.vue'),
            children: [
                {
                    path: 'login',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
                },
                {
                    path: 'signup',
                    component: () => import(/* webpackChunkName: "signup" */ './views/SignUp.vue'),
                },
                {
                    path: 'recover-password',
                    component: () => import(/* webpackChunkName: "recover-password" */ './views/PasswordRecovery.vue'),
                },
                {
                    path: 'reset-password',
                    component: () => import(/* webpackChunkName: "reset-password" */ './views/ResetPassword.vue'),
                },
                {
                    path: 'admin',
                    component: () => import(/* webpackChunkName: "admin" */ './views/admin/Main.vue'),
                    children: [
                        {
                            path: 'dashboard',
                            component: () => import(/* webpackChunkName: "admin-dashboard" */ './views/admin/Dashboard.vue'),
                        },
                        {
                            path: 'profile',
                            component: RouterComponent,
                            redirect: 'profile/view',
                            children: [
                                {
                                    path: 'view',
                                    component: () => import(
                                        /* webpackChunkName: "admin-profile" */
                                        './views/admin/profile/UserProfile.vue'),
                                },
                                {
                                    path: 'edit',
                                    component: () => import(
                                        /* webpackChunkName: "admin-profile-edit" */
                                        './views/admin/profile/UserProfileEdit.vue'),
                                },
                                {
                                    path: 'password',
                                    component: () => import(
                                        /* webpackChunkName: "admin-profile-password" */
                                        './views/admin/profile/UserProfileEditPassword.vue'),
                                },
                            ],
                        },
                        {
                            path: 'admin',
                            component: () => import(
                                /* webpackChunkName: "admin-admin" */
                                './views/admin/admin/Admin.vue'),
                            redirect: 'admin/users/all',
                            children: [
                                {
                                    path: 'users',
                                    redirect: 'users/all',
                                },
                                {
                                    path: 'users/all',
                                    component: () => import(
                                        /* webpackChunkName: "admin-admin-users" */
                                        './views/admin/admin/AdminUsers.vue'),
                                },
                                {
                                    path: 'users/edit/:id',
                                    name: 'admin-admin-users-edit',
                                    component: () => import(
                                        /* webpackChunkName: "admin-admin-users-edit" */
                                        './views/admin/admin/EditUser.vue'),
                                },
                                {
                                    path: 'users/create',
                                    name: 'admin-admin-users-create',
                                    component: () => import(
                                        /* webpackChunkName: "admin-admin-users-create" */
                                        './views/admin/admin/CreateUser.vue'),
                                },
                            ],
                        },

                    ],
                },
                {
                    path: 'main',
                    component: () => import(
                        /* webpackChunkName: "Main" */
                        './views/main/Main.vue'),
                    children: [
                        {
                            path: 'matching',
                            component: () => import(
                                /* webpackChunkName: "main-Matching" */
                                './views/main/Matching.vue'),
                        },
                        {
                            path: 'messages',
                            component: () => import(
                                /* webpackChunkName: "main-Messages" */
                                './views/main/Messages.vue'),
                        },
                        {
                            path: 'profile',
                            component: () => import(
                                /* webpackChunkName: "main-Profile" */
                                './views/main/Profile.vue'),
                        },
                        {
                            path: 'updates',
                            component: () => import(
                                /* webpackChunkName: "main-Updates" */
                                './views/main/Updates.vue'),
                        },

                    ],
                },
            ],
        },
        {
            path: '/*', redirect: '/',
        },
    ],
});
