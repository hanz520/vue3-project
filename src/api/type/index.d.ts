export declare interface HttpResponse<T> {
  state?: string
  code?: 1 | 0
  message: string
  data: T
}
