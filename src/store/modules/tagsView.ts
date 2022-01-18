import { defineStore } from 'pinia'
import { RouteRecordName, RouteRecordRaw } from 'vue-router'

interface TagsViewState {
  visitedViews: RouteRecordRaw[]
  cachedViews: RouteRecordName[]
}

/**
 * 具体实现
 */
export const useTagsViewStore = defineStore({
  id: 'nav',
  state(): TagsViewState {
    return {
      visitedViews: [],
      cachedViews: []
    }
  },
  actions: {}
})
