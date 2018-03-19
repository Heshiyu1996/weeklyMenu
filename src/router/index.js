import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Book from '@/pages/book'
import BookDetail from '@/pages/bookDetail'
import Login from '@/pages/login'
import Regist from '@/pages/regist'
import User from '@/pages/user'
import FeedBack from '@/pages/user/feedBack'
import MyFeedBack from '@/pages/user/myFeedBack'
import MyFeedBackDetail from '@/pages/myFeedBackDetail'
import Search from '@/pages/search'
import test from '@/pages/test'
import foodDetail from '@/pages/foodDetail'

import MyMark from '@/pages/user/myMark'
import MyOrder from '@/pages/user/myOrder'
import OrderDetail from '@/pages/user/orderDetail'
import MyCharacter from '@/pages/user/myCharacter'

import superIndex from '@/pages/super/index'
import Reply from '@/pages/super/reply'
import Analysis from '@/pages/super/analysis'
import AddFood from '@/pages/super/addFood'
import EditFood from '@/pages/super/editFood'
import DeleteFood from '@/pages/super/deleteFood'
import CheckFood from '@/pages/super/checkFood'
import FoodSearch from '@/pages/super/foodSearch'

Vue.use(Router)

export default new Router({
    
    routes: [
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
            component: User,
            children: [{
                path: 'myMark',
                name: 'myMark',
                component: MyMark,
                meta: {
                    inChild: true
                }
            },
            {
                path: 'myCharacter',
                name: 'myCharacter',
                component: MyCharacter,
                meta: {
                    inChild: true
                }
            },
            {
                path: 'myFeedBack',
                name: 'myFeedBack',
                component: MyFeedBack,
                meta: {
                    inChild: true
                }
            },
            {
                path: 'feedBack',
                name: 'feedBack',
                component: FeedBack,
                meta: {
                    inChild: true
                }
            }, {
                path: 'myOrder',
                name: 'myOrder',
                component: MyOrder,
                meta: {
                    inChild: true
                }
            }, {
                path: 'orderDetail/:orderId',
                name: 'orderDetail',
                component: OrderDetail,
                meta: {
                    inChild: true
                }
            }]
        },
        {
            path: '/feedBack',
            name: 'feedBack',
            component: FeedBack
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
            component: BookDetail,
            meta: {
                hideSwitchBar: true,
                keepAlive: true
            }
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
                path: 'analysis',
                name: 'analysis',
                component: Analysis,
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
