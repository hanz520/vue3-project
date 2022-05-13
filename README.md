# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 添加sass

## 添加commitlint husky

## 添加eslint

## 新增编辑组件命名规则

- a add 新增
- e edit  编辑
- m modal 弹框
- v view  页面

如：aemAuth 代表新增/编辑权限的弹框，avAuth代表新增权限的界面

## 页面组件需要添加组件名，用于缓存使用

```js
<script lang="ts">
export default { name: 'Auth' }
</script>
```
