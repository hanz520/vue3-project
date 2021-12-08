import Api from '../base'
import { HttpResponse } from '../type'
// import type { DataInstanceData } from './modelService'
// import { HttpResponse } from '@/services/type'
// import { useSchemeStore } from '@/store'

// export interface AttrList {
//   attrCode: string
//   attrName: string
// }

export default class TestApi {
  static async getlist(): Promise<HttpResponse<any>> {
    return Api.get('/openapi/music/basic/recommend/playlist/get', {
      params: {
        limit: 10,
        offset: 1
      }
    })
  }
}
