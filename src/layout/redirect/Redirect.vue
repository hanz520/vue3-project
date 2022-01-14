<template><div></div></template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import type { RouteRecordName } from 'vue-router'
const router = useRouter()
const route = useRoute()

const prename = route.query.prename as RouteRecordName
const preparams = route.query.preparams as string
const prequery = route.query.prequery as string

router.replace({
  name: prename,
  params: JSON.parse(preparams),
  query: JSON.parse(prequery)
})
</script>
