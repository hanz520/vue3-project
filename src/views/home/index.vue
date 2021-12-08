<template>
  <div>首页来着</div>
  <a-button @click="changeFn">更改datazone</a-button>
  <a-button @click="addFn">添加职业</a-button>
  <a-button @click="viewFn">查看</a-button>
</template>

<script lang="ts" setup>
import useStorage from '../../composition/hooks/useStorage'

const storage = useStorage()

// storage.setItem('name', 'hanz')
const changeFn = () => {
  storage.setZoneName('hanzZone')
}
const addFn = () => {
  storage.setItem('work', 'IT')
}
const viewFn = () => {
  console.log(storage.list())
  storage.show()
}
</script>
<style lang="scss" scoped></style>
