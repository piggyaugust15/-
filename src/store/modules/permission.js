import { constantRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'

// 这里是 根据 权限 获得路由的地方哦

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = constantRoutes.concat(routes)
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      // 顶部导航菜单默认添加统计报表栏指向首页
      const index = [{
        path: 'index',
        meta: { title: '统计报表', icon: 'dashboard' }
      }]
      state.topbarRouters = routes.concat(index);
    },

    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    },

  },

  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {

        // 向后端请求路由数据
        getRouters().then(res => {

          // 转换数据
          const sdata = JSON.parse(JSON.stringify(res.data))
          const rdata = JSON.parse(JSON.stringify(res.data))

          //转换成 数组
          const sidebarRoutes = filterAsyncRouter(sdata)
          const rewriteRoutes = filterAsyncRouter(rdata, false, true)

          // 把 404 push 上去 但是 不用
          rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })

          commit('SET_ROUTES', rewriteRoutes)
          //不需要动态判断权限的路由
          commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))

          commit('SET_DEFAULT_ROUTES', sidebarRoutes)
          commit('SET_TOPBAR_ROUTES', sidebarRoutes)

          resolve(rewriteRoutes)

        })
      })
    }
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {

    if (type && route.children) {
      route.children = filterChildren(route.children)
    }

    // 如果存在路由组件
    if (route.component) {
      // Layout ParentView 组件特殊处理        直接把这些加进去
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}


//  所以说 每次加个路径进去就okk了
export const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views/${view}`], resolve)
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`)
  }
}

export default permission
