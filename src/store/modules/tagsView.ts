import { defineStore } from 'pinia'
import { RouteLocationNormalizedLoaded } from 'vue-router'

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
    addView(route: RouteLocationNormalizedLoaded) {
      if (!this.visitedViews.some((view) => view.path === route.path)) {
        this.visitedViews.push(
          Object.assign({}, route, {
            title: route.meta.title || '匿名标签'
          })
        )
      }
      let routeName = route.name as string
      routeName = routeName.charAt(0).toUpperCase() + routeName.slice(1)
      if (!this.cachedViews.includes(routeName)) {
        this.cachedViews.push(routeName)
      }
    },
    delView(route: RouteLocationNormalizedLoaded) {
      if (this.visitedViews.some((view) => view.path === route.path)) {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === route.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
      }
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
    }
  }
})
