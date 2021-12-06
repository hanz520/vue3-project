import { reactive, readonly, ref, watch } from 'vue'
import type { Ref } from 'vue'

export interface CountRange {
  min: number
  max: number
}

export interface CountController {
  minus: (num?: number) => number
  plus: (num?: number) => number
  reset: (num?: number) => number
  setRange: (newRange: CountRange) => CountRange
}

export default function useCount(init: number): [Ref<number>, CountController] {
  const range = reactive({ max: Infinity, min: -Infinity })
  const current = ref(init)

  const minus = (num = 1): number => {
    current.value -= num

    return current.value
  }

  const plus = (num = 1): number => {
    current.value += num

    return current.value
  }

  const reset = (num?: number): number => {
    if (num) init = num
    current.value = init

    return current.value
  }

  const setRange = (newRange: CountRange): CountRange => {
    const { max, min } = newRange
    range.max = max
    range.min = min
    if (current.value > max) {
      current.value = max
    } else if (current.value < min) {
      current.value = min
    }

    return readonly(range)
  }

  watch(
    current,
    (newVal: number, oldVal: number | undefined) => {
      if (newVal === oldVal) {
        return
      }
      if (newVal < range.min) {
        current.value = range.min
        console.warn(`所得值为:${newVal},已小于设定的最小值${range.min},更改为最小值`)
      } else if (newVal > range.max) {
        current.value = range.max
        console.warn(`所得值为:${newVal},已小于设定的最大值${range.max},更改为最大值`)
      }
    },
    { immediate: true }
  )

  return [readonly(current), { minus, plus, reset, setRange }]
}
