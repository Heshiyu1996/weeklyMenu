import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Book from '@/pages/book'
import BookDetail from '@/pages/bookDetail'
import Login from '@/pages/login'
import Regist from '@/pages/regist'
import User from '@/pages/user'
import FeedBack from '@/pages/feedBack'
import MyFeedBack from '@/pages/myFeedBack'
import MyCharacter from '@/pages/myCharacter'
import MyMark from '@/pages/myMark'
import MyFeedBackDetail from '@/pages/myFeedBackDetail'
import Search from '@/pages/search'
import test from '@/pages/test'
import foodDetail from '@/pages/foodDetail'

import superIndex from '@/pages/super/index'
import Reply from '@/pages/super/reply'
import AddFood from '@/pages/super/addFood'
import EditFood from '@/pages/super/editFood'
import DeleteFood from '@/pages/super/deleteFood'
import CheckFood from '@/pages/super/checkFood'
import FoodSearch from '@/pages/super/foodSearch'

Vue.use(Router)

export default new Router({
    routes: [
        // {
        //     path: '/',
        //     name: 'Index',
        //     component: Index,
        //     meta: { 
        //         keepAlive: true 
        //     }
        // },        
        {
            path: '/',
            name: 'index',
            component: Index,
            meta: { 
                keepAlive: true 
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/regist',
            name: 'regist',
            component: Regist
        },
        {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/feedBack',
            name: 'feedBack',
            component: FeedBack
        },
        {
            path: '/myFeedBack',
            name: 'myFeedBack',
            component: MyFeedBack
        },
        {
            path: '/myMark',
            name: 'myMark',
            component: MyMark
        },
        {
            path: '/myCharacter',
            name: 'myCharacter',
            component: MyCharacter
        },
        {
            path: '/myFeedBackDetail/:fid',
            name: 'myFeedBackDetail',
            component: MyFeedBackDetail
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        },
        {
            path: '/foodDetail/:foodId',
            name: 'foodDetail',
            component: foodDetail
        },
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '/book',
            name: 'book',
            component: Book,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/bookDetail/:dateCode/:dayIndex/:pid/:userId',
            name: 'bookDetail',
            component: BookDetail
        },
        {
            path: '/super',
            name: 'super',
            component: superIndex,
            meta: {
                inChild: false
            },
            children: [{
                path: 'reply',
                name: 'reply',
                component: Reply,
                meta: {
                    inChild: true
                }
            }, {
                path: 'addFood',
                name: 'addFood',
                component: AddFood,
                meta: {
                    inChild: true
                }
            }, {
                path: 'editFood',
                name: 'editFood',
                component: EditFood,
                meta: {
                    inChild: true
                }
            }, {
                path: 'deleteFood',
                name: 'deleteFood',
                component: DeleteFood,
                meta: {
                    inChild: true
                }
            }, {
                path: 'checkFood',
                name: 'checkFood',
                component: CheckFood,
                meta: {
                    inChild: true
                }
            }, {
                path: 'foodSearch',
                name: 'foodSearch',
                component: FoodSearch,
                meta: {
                    inChild: true
                }
            }]
        }
    ]
})
