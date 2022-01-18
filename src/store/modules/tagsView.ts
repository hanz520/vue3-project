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
    addView(route: RouteLocationNormalizedLoaded): Promise<TagsViewState> {
      return new Promise((resolve) => {
        if (!route.meta.noCache) {
          // 添加visitedViews
          if (!this.visitedViews.some((view) => view.path === route.path)) {
            this.visitedViews.push(
              Object.assign({}, route, {
                title: route.meta.title || '匿名标签'
              })
            )
          }
          // 添加cachedViews
          let routeName = route.name as string
          routeName = routeName.charAt(0).toUpperCase() + routeName.slice(1)
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
    delCachedViews(route: RouteLocationNormalizedLoaded) {
      let routeName = route.name as string
      routeName = routeName.charAt(0).toUpperCase() + routeName.slice(1)
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
    }
  }
})
