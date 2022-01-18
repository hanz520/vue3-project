import { defineStore } from 'pinia'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import router from '@/router'

interface TagsViewState {
  visitedViews: RouteLocationNormalizedLoaded[]
  cachedViews: string[]
}

/**
 * 具体实现
 */
export const useTagsViewStore = defineStore({
  id: 'tagsView',
  state(): TagsViewState {
    return {
      visitedViews: [],
      cachedViews: []
    }
  },
  actions: {
    // 定义路由名称的时候，可能由于疏忽导致路由名首字母小写，然而组件内的组件名IDE自动首字母大写，此处将存入cachedViews的路由名大写，避免缓存失败的问题
    getRouteName(route: RouteLocationNormalizedLoaded): string {
      const routeName = route.name as string
      return routeName.charAt(0).toUpperCase() + routeName.slice(1)
    },
    // 添加一个缓存视图: 包括路由和组件
    addView(route: RouteLocationNormalizedLoaded): Promise<TagsViewState> {
      return new Promise((resolve) => {
        if (!route.meta.noCache) {
          // 添加visitedViews todo: 可能需要进行update
          if (!this.visitedViews.some((view) => view.path === route.path)) {
            this.visitedViews.push(
              Object.assign({}, route, {
                title: route.meta.title || '匿名标签'
              })
            )
          }
          // 添加cachedViews
          const routeName = this.getRouteName(route)
          if (!this.cachedViews.includes(routeName)) {
            this.cachedViews.push(routeName)
          }
        }
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    // 删除缓存组件
    delCachedViews(route: RouteLocationNormalizedLoaded) {
      const routeName = this.getRouteName(route)
      if (this.cachedViews.includes(routeName)) {
        for (const i of this.cachedViews) {
          if (i === routeName) {
            const index = this.cachedViews.indexOf(i)
            this.cachedViews.splice(index, 1)
            break
          }
        }
      }
    },
    // 删除指定缓存视图: 包括路由和组件
    delView(route: RouteLocationNormalizedLoaded): Promise<TagsViewState> {
      return new Promise((resolve) => {
        // 删除visitedViews
        if (this.visitedViews.some((view) => view.path === route.path)) {
          for (const [i, v] of this.visitedViews.entries()) {
            if (v.path === route.path) {
              this.visitedViews.splice(i, 1)
              break
            }
          }
        }
        // 删除cachedViews
        this.delCachedViews(route)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    // 刷新指定视图
    refreshView(route: RouteLocationNormalizedLoaded) {
      this.delCachedViews(route)
      router.replace({
        name: 'redirect',
        query: {
          prename: route.name as string,
          preparams: JSON.stringify(route.params),
          prequery: JSON.stringify(route.query)
        }
      })
    },
    delOtherView(route: RouteLocationNormalizedLoaded): Promise<TagsViewState> {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.meta.affix || v.path === route.path
        })

        const routeName = this.getRouteName(route)
        const index = this.cachedViews.indexOf(routeName)
        this.cachedViews = index > -1 ? this.cachedViews.slice(index, index + 1) : []

        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delAllView(): Promise<TagsViewState> {
      return new Promise((resolve) => {
        this.visitedViews = []
        this.cachedViews = []
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    }
  }
})
